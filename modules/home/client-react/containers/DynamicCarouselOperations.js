import { message } from 'antd';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';

// Query
import DYNAMIC_CAROUSEL_QUERY from '../graphql/DynamicCarouselQuery.graphql';
import DYNAMIC_CAROUSELS_QUERY from '../graphql/DynamicCarouselsQuery.graphql';

// Mutation
import ADD_DYNAMIC_CAROUSEL from '../graphql/AddDynamicCarousel.graphql';
import DELETE_DYNAMIC_CAROUSEL from '../graphql/DeleteDynamicCarousel.graphql';
import EDIT_DYNAMIC_CAROUSEL from '../graphql/EditDynamicCarousel.graphql';

// Subscription
import DYNAMIC_CAROUSEL_SUBSCRIPTION from '../graphql/DynamicCarouselSubscription.graphql';

// Query
const withDynamicCarousels = Component =>
  graphql(DYNAMIC_CAROUSELS_QUERY, {
    props({ data: { loading, error, dynamicCarousels, subscribeToMore, updateQuery, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { loading, dynamicCarousels, subscribeToMore, updateQuery, refetch };
    }
  })(Component);

const withDynamicCarousel = Component =>
  graphql(DYNAMIC_CAROUSEL_QUERY, {
    options: props => {
      // console.log(props);
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, dynamicCarousel, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, dynamicCarousel, subscribeToMore, updateQuery };
    }
  })(Component);

// Mutation
const withDeleteDynamicCarousel = Component =>
  graphql(DELETE_DYNAMIC_CAROUSEL, {
    props: ({ mutate }) => ({
      deleteDynamicCarousel: async id => {
        const {
          data: { deleteDynamicCarousel }
        } = await mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteDynamicCarousel: {
              id: id,
              __typename: 'DynamicCarousel'
            }
          }
        });
        console.log('object', deleteDynamicCarousel);
        if (deleteDynamicCarousel) message.warning('Banner deleted.');
        else message.warning('Try again!');
      }
    })
  })(Component);

const withAddDynamicCarousel = Component =>
  graphql(ADD_DYNAMIC_CAROUSEL, {
    props: ({ ownProps: { history }, mutate }) => ({
      addDynamicCarousel: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addDynamicCarousel: {
                __typename: 'DynamicCarousel',
                ...values
              }
            }
          });

          message.destroy();
          message.success('Banner added.');
          history.push('/dynamic-carousel');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

const withEditDynamicCarousel = Component =>
  graphql(EDIT_DYNAMIC_CAROUSEL, {
    props: ({ ownProps: { history }, mutate }) => ({
      editDynamicCarousel: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          // console.log('input', input);
          await mutate({
            variables: {
              input: values
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          history.push('/dynamic-carousel');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

// Subscription
const subscribeToDynamicCarousels = subscribeToMore =>
  subscribeToMore({
    document: DYNAMIC_CAROUSEL_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            dynamicCarouselUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddDynamicCarousels(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditDynamicCarousels(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteDynamicCarousels(prev, node.id);
      }
      return newResult;
    }
  });

function onAddDynamicCarousels(prev, node) {
  // check if it is duplicate
  if (prev.dynamicCarousels.some(dC => dC.id === node.id)) {
    return prev;
  }

  return update(prev, {
    dynamicCarousels: {
      $set: [...prev.dynamicCarousels, node]
    }
  });
}

function onEditDynamicCarousels(prev, node) {
  const index = prev.dynamicCarousels.findIndex(x => x.id === node.id);
  prev.dynamicCarousels.splice(index, 1, node);

  return update(prev, {
    dynamicCarousels: {
      $set: [...prev.dynamicCarousels]
    }
  });
}

const onDeleteDynamicCarousels = (prev, id) => {
  const index = prev.dynamicCarousels.findIndex(x => x.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    dynamicCarousels: {
      $splice: [[index, 1]]
    }
  });
};

const subscribeToDynamicCarousel = (subscribeToMore, history) =>
  subscribeToMore({
    document: DYNAMIC_CAROUSEL_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            dynamicCarouselUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'UPDATED') {
        newResult = onEditDynamicCarousel(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteDynamicCarousel(prev, node.id, history);
      }
      return newResult;
    }
  });

function onEditDynamicCarousel(prev, node) {
  return update(prev, {
    dynamicCarousel: {
      $set: node
    }
  });
}

const onDeleteDynamicCarousel = (prev, id, history) => {
  if (prev.dynamicCarousel.id === id) {
    message.error('Banner was deleted');
    history.push('/dynamic-carousel');
  }
};

export {
  // Query
  withDynamicCarousels,
  withDynamicCarousel,
  // Mutation
  withDeleteDynamicCarousel,
  withAddDynamicCarousel,
  withEditDynamicCarousel,
  // Subscription
  subscribeToDynamicCarousels,
  subscribeToDynamicCarousel
};
