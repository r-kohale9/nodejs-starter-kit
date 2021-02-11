import React from 'react';
import { History } from 'history';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

import ROUTES from '../routes';
import AddListingView from '../components/AddListingView.web';
import { withAddListing } from './ListingOperations';

// types
import { AddListingInput, EditListingInput } from '../../../../packages/server/__generated__/globalTypes';

export interface AddListingProps {
  loading: boolean;
  history: History;
  currentUser: CurrentUser;
  addListing: (input: AddListingInput) => void;
  t: TranslateFunction;
}

const AddListing: React.FC<AddListingProps> = props => {
  const { addListing, history } = props;

  const handleSubmit = async (values: EditListingInput) => {
    // console.log(values);
    Message.destroy();
    Message.loading('Please wait...', 0);
    try {
      delete values.id;
      delete values.listingFlags.id;
      delete values.listingOptions.id;
      delete values.listingDetail.id;
      addListing(values);
    } catch (e) {
      throw Error(e);
    }
    Message.destroy();
    Message.success('Listing added.');
    history.push(`${ROUTES.adminPanel}`);
  };

  // console.log('props', props);
  return <AddListingView {...props} onSubmit={handleSubmit} />;
};

export default compose(withAddListing, withCurrentUser, translate('listing'))(AddListing);
