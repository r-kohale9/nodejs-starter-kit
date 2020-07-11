import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withUsers } from '@gqlapp/user-client-react/containers/UserOperations';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ADD_REVIEW from '../graphql/AddReview.graphql';

import AddReviewView from '../components/AddReviewView.web';
// import { withAddReview } from './ReviewOperations';

const AddReview = props => {
  console.log('props', props);
  return <AddReviewView {...props} />;
};

export default compose(
  // withAddReview,
  withUsers,
  graphql(ADD_REVIEW, {
    props: ({ ownProps: { history }, mutate }) => ({
      addReview: async values => {
        console.log('addreview', values);

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
)(AddReview);
