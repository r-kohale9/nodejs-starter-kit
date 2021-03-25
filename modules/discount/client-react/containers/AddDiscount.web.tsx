import React from 'react';
import { match as Match } from 'react-router-dom';
import { History } from 'history';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { removeEmpty } from '@gqlapp/listing-client-react';

import ROUTES from '../routes';
import AddDiscountView from '../components/AddDiscountView.web';
import { withAddDiscount } from './DiscountOperations';

// types
import { AddDiscountInput, EditDiscountInput } from '../../../../packages/server/_generated_/globalTypes';

export interface AddDiscountProps {
  loading: boolean;
  history: History;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  match: Match<{ id: string; modalName: string }>;
  addDiscount: (values: AddDiscountInput) => void;
  t: TranslateFunction;
}

const AddDiscount: React.FC<AddDiscountProps> = props => {
  const { addDiscount, history, match, navigation } = props;

  const handleSubmit = async (values: EditDiscountInput) => {
    // console.log(values);
    let modalId = 0;
    let modalName = '';
    if (match) {
      modalId = Number(match.params.id);
      modalName = match.params.modalName;
    } else if (navigation) {
      modalId = Number(navigation.state.params.id);
      modalName = navigation.state.params.modalName;
    }
    Message.destroy();
    Message.loading('Please wait...', 0);
    try {
      await addDiscount(removeEmpty({ modalId, modalName, ...values }));
      Message.destroy();
      Message.success('Discount added.');
      history.push(`${ROUTES.adminPanel}`);
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <AddDiscountView {...props} onSubmit={handleSubmit} />;
};

export default compose(withAddDiscount, withAddDiscount, translate('discount'))(AddDiscount);
