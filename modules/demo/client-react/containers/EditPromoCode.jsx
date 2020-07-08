import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { PropTypes } from 'prop-types';

// import { withPromoCode, withCurrentUser, withEditPromoCode, updatePromoCodeState } from './PromoCodeOperations';

import EditPromoCodeView from '../components/EditPromoCodeView.web';
// import { usePromoCodeWithSubscription } from './withSubscriptions';
import PROMOCODE_QUERY from '../graphql/PromoCodeQuery.graphql';
import EDIT_PROMOCODE from '../graphql/EditPromoCode.graphql';

const EditPromoCode = props => {
  const { updateQuery, subscribeToMore, promoCode, history } = props;
  // const promoCodesUpdated = usePromoCodeWithSubscription(subscribeToMore, promoCode && promoCode.id);

  // useEffect(() => {
  //   if (promoCodesUpdated) {
  //     updatePromoCodeState(promoCodesUpdated, updateQuery, history);
  //   }
  // });
  console.log('props', props);
  return <EditPromoCodeView {...props} />;
};

EditPromoCode.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  promoCode: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  graphql(PROMOCODE_QUERY, {
    options: props => {
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
    props({ data: { loading, error, promoCode, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, promoCode, subscribeToMore, updateQuery };
    }
  }),
  graphql(EDIT_PROMOCODE, {
    props: ({
      ownProps: {
        history,
        navigation
        // currentUser: { role }
      },
      mutate
    }) => ({
      editPromoCode: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          // if (history) {
          //   if (role === 'admin') return history.push('/demo/promocodes');
          //   else return history.push('/my-promos');
          // }
          // if (navigation) {
          //   if (role === 'admin') return navigation.navigate('ListingCatalogue');
          //   else return navigation.navigate('MyPromoCodes');
          // }
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  // withCurrentUser, withPromoCode, withEditPromoCode,
  translate('demo')
)(EditPromoCode);
