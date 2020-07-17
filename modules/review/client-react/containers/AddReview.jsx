import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ADD_REVIEW from '../graphql/AddReview.graphql';
import AddReviewView from '../components/AddReviewView.web';

const AddReview = props => {
  return <AddReviewView {...props} />;
};

AddReview.propTypes = {
  usersUpdated: PropTypes.object,
  updateQuery: PropTypes.func,
  t: PropTypes.func,
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object
};

export default compose(
  graphql(ADD_REVIEW, {
    props: ({ ownProps: { history }, mutate }) => ({
      addReview: async values => {
        values.rating = Number(values.rating);
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addReview: {
                __typename: 'Review',
                ...values
              }
            }
          });

          message.destroy();
          message.success('Review added.');
          // console.log('addreview', values);
          history.push('/demo/reviews');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        loading,
        currentUser
      };
    }
  }),
  translate('review')
)(translate('user')(AddReview));
