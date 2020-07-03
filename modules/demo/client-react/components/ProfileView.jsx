import React from 'react';
import { PropTypes } from 'prop-types';

import ProfileComponenet from './ProfileComponenet';
import ProfileMenuItem from './ProfileMenuItem';
import PageLayout from './PageLayout';
import { PgTitle } from './StyledComponents';

const ProfileView = props => {
  const { history, user, menu } = props;
  return (
    <PageLayout history={history} showMenuBar={true}>
      <PgTitle>My profile</PgTitle>
      <ProfileComponenet user={user} />
      {menu && menu.map(data => <ProfileMenuItem data={data} />)}
    </PageLayout>
  );
};

ProfileView.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  menu: PropTypes.array
};

export default ProfileView;
