import React from 'react';
import { compose } from '@gqlapp/core-common';
import { withCurrentUser } from '@gqlapp/listing-client-react/containers/ListingOperations';
import ProfileView from '../components/ProfileView';

import { MENU } from './Data';

const Profile = props => {
  console.log('props', props);
  return <ProfileView {...props} menu={MENU} />;
};

export default compose(withCurrentUser)(Profile);
