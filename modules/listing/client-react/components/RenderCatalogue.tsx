import * as React from 'react';
import { History } from 'history';

import { EmptyComponent, Spinner, SuggestedListComponent, Col, Row } from '@gqlapp/look-client-react';
import { MODAL } from '@gqlapp/review-common';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

import RelatedCardComponent from './RelatedCardComponent';
import ListingFilterComponent from './ListingFilterComponent.web';

// types
import { listing_listing as Listing } from '../graphql/__generated__/listing';
import { listings_listings as Listings } from '../graphql/__generated__/listings';
import { getCart_getCart as GetCart } from '@gqlapp/order-client-react/graphql/__generated__/getCart';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

export interface RenderCatalogueProps {
  loading: boolean;
  showFilter: boolean;
  cartLoading: boolean;
  layout: string;
  emptyLink: string;
  getCart: GetCart;
  history: History;
  currentUser: CurrentUser;
  listings: Listings;
  loadData: (endCursor: number, action: string) => { data: { listings: Listings } };
  onDelete: (id: number) => void;
  t: TranslateFunction;
}

const RenderCatalogue: React.FC<RenderCatalogueProps> = props => {
  const {
    t,
    showFilter,
    currentUser,
    getCart,
    cartLoading,
    onDelete,
    loadData,
    history,
    layout,
    loading,
    listings,
    emptyLink
  } = props;
  const span =
    layout === 'vertical'
      ? {
          spanFilter: { lg: 6, md: 8, sm: 24 },
          spanContent: { lg: 18, md: 16, sm: 24 }
        }
      : {
          spanFilter: { span: 24 },
          spanContent: { span: 24 }
        };

  const renderFunc = (key: number, listing: Listing) => {
    const cartItemArray =
      getCart && getCart.orderDetails && getCart.orderDetails.length > 0
        ? getCart.orderDetails.filter(oD => oD.modalId === listing.id)
        : [];
    return (
      <RelatedCardComponent
        key={key}
        listing={listing}
        history={history}
        modalName={MODAL[1].value}
        modalId={listing.id}
        currentUser={currentUser}
        inCart={cartItemArray.length === 0}
        loading={cartLoading}
        onDelete={() => onDelete(cartItemArray[0].id)}
      />
    );
  };
  const RenderListings = () => (
    <div>
      <SuggestedListComponent
        endText={'listing'}
        grid={
          layout === 'vertical' && {
            gutter: 18,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4
          }
        }
        items={listings}
        renderFunc={renderFunc}
        loadData={loadData}
      />
    </div>
  );
  return (
    <Row type="flex" gutter={[24, 24]}>
      <Col {...span.spanFilter}>
        {layout !== 'vertical' && <br />}
        {showFilter && (
          <ListingFilterComponent showIsActive={false} filter={{ isActive: true }} orderBy={{}} {...props} />
        )}
      </Col>
      <Col {...span.spanContent}>
        {loading && <Spinner />}
        {!loading && listings && listings.totalCount ? (
          <RenderListings />
        ) : !loading ? (
          <EmptyComponent description={t('listing.noListingsMsg')} emptyLink={emptyLink} />
        ) : null}
      </Col>
    </Row>
  );
};

export default RenderCatalogue;
