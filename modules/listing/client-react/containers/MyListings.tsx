import React from 'react';
import { History } from 'history';

import { compose } from '@gqlapp/core-common';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

import MyListingsContainer from './MyListingsContainer';

// types
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

export interface MyListingsProps {
  history: History;
  currentUser: CurrentUser;
  t: TranslateFunction;
}

const MyListings: React.FC<MyListingsProps> = props => {
  const { currentUser } = props;

  return <MyListingsContainer {...props} addFilter={{ userId: currentUser && currentUser.id }}></MyListingsContainer>;
};

export default compose(withCurrentUser)(MyListings);
