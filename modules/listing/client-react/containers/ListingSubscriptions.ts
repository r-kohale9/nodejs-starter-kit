import update from 'immutability-helper';
import { SubscribeToMoreOptions } from 'apollo-client';
import { History } from 'history';

import { Message } from '@gqlapp/look-client-react';
import { HOME_ROUTES } from '@gqlapp/home-client-react';

import LISTINGS_BOOKMARK_SUBSCRIPTION from '../graphql/MyListingsBookmarkSubscription.graphql';
import LISTINGS_SUBSCRIPTION from '../graphql/ListingsSubscription.graphql';
import LISTING_SUBSCRIPTION from '../graphql/ListingSubscription.graphql';
import LISTING_REVIEW_SUBSCRIPTION from '../graphql/ListingReviewSubscription.graphql';

import ROUTES from '../routes';

// types
import { FilterListInput } from '../../../../packages/server/__generated__/globalTypes';
import {
  listings_listings as Listings,
  listings_listings_edges as ListingEdges
} from '../graphql/__generated__/listings';
import { listing_listing as Listing } from '../graphql/__generated__/listing';
import { myListingsBookmark_myListingsBookmark as MyListingsBookmark } from '../graphql/__generated__/myListingsBookmark';

export const subscribeToListing = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  listingId: number,
  history: History
) =>
  subscribeToMore({
    document: LISTING_SUBSCRIPTION,
    variables: { id: listingId },
    updateQuery: (
      prev: { listing: Listing },
      {
        subscriptionData: {
          data: {
            listingUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { listingUpdated: { mutation: string; node: Listing } } } }
    ) => {
      let newResult = prev;
      // console.log('mutation', mutation, node);
      if (mutation === 'UPDATED') {
        newResult = onEditListing(prev, node);
      } else if (mutation === 'DELETED') {
        onDeleteListing(history);
      }
      return newResult;
    }
  });

function onEditListing(prev: { listing: Listing }, node: Listing) {
  return update(prev, {
    listing: {
      $set: node
    }
  });
}

const onDeleteListing = (history: History) => {
  Message.info('This listing has been deleted!');
  if (history) {
    Message.warn('Redirecting to my listings');
    return history.push(`${ROUTES.myListing}`);
  } else {
    return history.push(`${HOME_ROUTES.home}`);
  }
};

export const subscribeToListings = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  filter: FilterListInput
) =>
  subscribeToMore({
    document: LISTINGS_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev: { listings: Listings },
      {
        subscriptionData: {
          data: {
            listingsUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { listingsUpdated: { mutation: string; node: Listing } } } }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddListings(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditListings(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteListings(prev, node.id);
      }
      return newResult;
    }
  });

function onAddListings(prev: { listings: Listings }, node: Listing) {
  // console.log('prev', prev, node);
  if (prev.listings.edges.some(listing => node.id === listing.cursor)) {
    return update(prev, {
      listings: {
        totalCount: {
          $set: prev.listings.totalCount - 1
        },
        edges: {
          $set: prev.listings.edges
        }
      }
    });
  }

  const filteredListings = prev.listings.edges.filter(listing => listing.node.id !== null);

  const edge: ListingEdges = {
    cursor: node.id,
    node,
    __typename: 'ListingEdges'
  };

  return update(prev, {
    listings: {
      totalCount: {
        $set: prev.listings.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredListings]
      }
    }
  });
}

function onEditListings(prev: { listings: Listings }, node: Listing) {
  const index = prev.listings.edges.findIndex(x => x.node.id === node.id);
  const edge: ListingEdges = {
    cursor: node.id,
    node,
    __typename: 'ListingEdges'
  };
  if (index) {
    prev.listings.edges.splice(index, 1, edge);
    return update(prev, {
      listings: {
        edges: {
          $set: [...prev.listings.edges]
        }
      }
    });
  }
}

const onDeleteListings = (prev: { listings: Listings }, id: number) => {
  // console.log('called', id);
  const index = prev.listings.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    listings: {
      totalCount: {
        $set: prev.listings.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};

export const subscribeToListingsBookmark = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  filter: FilterListInput
) =>
  subscribeToMore({
    document: LISTINGS_BOOKMARK_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev: { myListingsBookmark: MyListingsBookmark },
      {
        subscriptionData: {
          data: {
            listingsBookmarkUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { listingsBookmarkUpdated: { mutation: string; node: Listing } } } }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddListingsBookmark(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditListingsBookmark(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteListingsBookmark(prev, node.id);
      }
      return newResult;
    }
  });

function onAddListingsBookmark(prev: { myListingsBookmark: MyListingsBookmark }, node: Listing) {
  // console.log('prev', prev, node);
  if (prev.myListingsBookmark.edges.some(listing => node.id === listing.cursor)) {
    return update(prev, {
      myListingsBookmark: {
        totalCount: {
          $set: prev.myListingsBookmark.totalCount - 1
        },
        edges: {
          $set: prev.myListingsBookmark.edges
        }
      }
    });
  }

  const filteredListings = prev.myListingsBookmark.edges.filter(listing => listing.node.id !== null);

  const edge: ListingEdges = {
    cursor: node.id,
    node,
    __typename: 'ListingEdges'
  };

  return update(prev, {
    myListingsBookmark: {
      totalCount: {
        $set: prev.myListingsBookmark.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredListings]
      }
    }
  });
}

function onEditListingsBookmark(prev: { myListingsBookmark: MyListingsBookmark }, node: Listing) {
  const index = prev.myListingsBookmark.edges.findIndex(x => x.node.id === node.id);
  const edge: ListingEdges = {
    cursor: node.id,
    node,
    __typename: 'ListingEdges'
  };
  if (index) {
    prev.myListingsBookmark.edges.splice(index, 1, edge);
    return update(prev, {
      myListingsBookmark: {
        edges: {
          $set: [...prev.myListingsBookmark.edges]
        }
      }
    });
  }
}

const onDeleteListingsBookmark = (prev: { myListingsBookmark: MyListingsBookmark }, id: number) => {
  // console.log('called', id);
  const index = prev.myListingsBookmark.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    myListingsBookmark: {
      totalCount: {
        $set: prev.myListingsBookmark.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};

export const subscribeToListingReview = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  listingId: number
) =>
  subscribeToMore({
    document: LISTING_REVIEW_SUBSCRIPTION,
    variables: { id: listingId },
    updateQuery: (
      prev: { canUserReview: boolean },
      {
        subscriptionData: {
          data: {
            listingReview: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { listingReview: { mutation: string; node: boolean } } } }
    ) => {
      let newResult = prev;
      // console.log("mutation", mutation, node);
      if (mutation === 'CREATED') {
        newResult = onAddListingReview(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteListingReview(prev, node);
      }
      return newResult;
    }
  });

function onAddListingReview(prev: { canUserReview: boolean }, node: boolean) {
  return update(prev, {
    canUserReview: {
      $set: node
    }
  });
}

const onDeleteListingReview = (prev: { canUserReview: boolean }, node: boolean) => {
  return update(prev, {
    canUserReview: {
      $set: node
    }
  });
};
