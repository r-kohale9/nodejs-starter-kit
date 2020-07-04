import React from 'react';

import ProfileView from '../components/ProfileView';

import { PERSONAL_INFO, MENU } from './Data';

const Profile = props => {
  return <ProfileView {...props} user={PERSONAL_INFO} menu={MENU} />;
};

export default Profile;
