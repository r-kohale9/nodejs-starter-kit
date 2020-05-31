import React from 'react';
import styled from 'styled-components';
import PageLayout from './PageLayout';

// import ListingItemComponent from './ListingItemComponent';
// import UserDisplayDetailComponent from './UserDisplayDetailComponent';
import ProfileComponenet from './ProfileComponenet';
import ProfileMenuItem from './ProfileMenuItem';
import UserDisplayComponent from './UserDisplayComponent';
import HomeSlick from './HomeSlick';
import CategoryIconSlick from './CategoryIconSlick';
// import MenuBar from './MenuBar';

const Profile = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 42px;

  /* Black */

  color: #222222;
`;

const ListingCatalogueView = props => {
  const { listings, history, users, user, homeSlick, categorySlick, profileList } = props;

  console.log('props', props);
  return (
    <>
      <PageLayout selectedTab="HOME" history={history}>
        <HomeSlick data={homeSlick} />
        <CategoryIconSlick data={categorySlick} />
        {users.map(user => {
          return <UserDisplayComponent user={user} />;
        })}
      </PageLayout>
    </>
  );
};

export default ListingCatalogueView;
