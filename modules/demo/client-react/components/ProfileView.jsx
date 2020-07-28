import React from 'react';
import { PropTypes } from 'prop-types';

import ProfileComponenet from './ProfileComponenet';
import ProfileMenuItem from './ProfileMenuItem';
import PageLayout from './PageLayout';
import { PgTitle } from './StyledComponents';

const ProfileView = props => {
  const { history, currentUser, menu } = props;
  return (
    <PageLayout history={history} showMenuBar={true} selectedTab="PROFILE">
      <PgTitle>My profile</PgTitle>
      <ProfileComponenet user={currentUser} />
      {menu && menu.map(data => <ProfileMenuItem data={data} />)}
    </PageLayout>
  );
};

ProfileView.propTypes = {
  history: PropTypes.object,
  currentUser: PropTypes.object,
  menu: PropTypes.array
};

export default ProfileView;
