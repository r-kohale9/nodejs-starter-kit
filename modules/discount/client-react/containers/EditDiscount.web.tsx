import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import { match as Match } from 'react-router-dom';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { removeEmpty } from '@gqlapp/listing-client-react';

import ROUTES from '../routes';
import EditDiscountView from '../components/EditDiscountView.web';
import { subscribeToDiscount } from './DiscountSubscriptions';
import { withModalDiscount, withEditDiscount } from './DiscountOperations';

// types
import { EditDiscountInput } from '../../../../packages/server/__generated__/globalTypes';

export interface EditDiscountProps {
  loading: boolean;
  history: History;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  editDiscount: (input: EditDiscountInput) => void;
  match: Match<{ id: string; modalName: string }>;
  discountSubscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  t: TranslateFunction;
}

const EditDiscount: React.FunctionComponent<EditDiscountProps> = props => {
  const { editDiscount, history, discountSubscribeToMore, match, navigation } = props;
  let modalId = 0;
  let modalName = '';
  if (match) {
    modalId = Number(match.params.id);
    modalName = match.params.modalName;
  } else if (navigation) {
    modalId = Number(navigation.state.params.id);
    modalName = navigation.state.params.modalName;
  }

  useEffect(() => {
    const subscribe = subscribeToDiscount(discountSubscribeToMore, modalId);
    return () => subscribe();
  }, [discountSubscribeToMore, modalId]);

  const handleSubmit = async (values: EditDiscountInput) => {
    // console.log(values);
    Message.destroy();
    Message.loading('Please wait...', 0);
    try {
      await editDiscount(removeEmpty({ modalId, modalName, ...values }));
      Message.destroy();
      Message.success('Discount edited.');
      history.push(`${ROUTES.adminPanel}`);
    } catch (e) {
      throw Error(e);
    }
  };
  return <EditDiscountView onSubmit={handleSubmit} {...props} />;
};

export default compose(withModalDiscount, withEditDiscount, translate('discount'))(EditDiscount);
