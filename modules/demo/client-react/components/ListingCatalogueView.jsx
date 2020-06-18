import React from 'react';
import styled from 'styled-components';
import PageLayout from './PageLayout';
import Avatar from '../Icons/userimage.svg';

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
  const { listings, history, user, homeSlick, categorySlick, profileList } = props;
  const users =
    props.users &&
    props.users.map(user => {
      user.name = 'Riya Rodriguez';
      user.thumbnail = Avatar;
      user.rating = 4.6;
      user.distance = 3;
      user.menu = ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'];
      user.details =
        "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better";
      return user;
    });
  console.log('props1', props);
  return (
    <>
      <PageLayout selectedTab="HOME" history={history}>
        <HomeSlick data={homeSlick} />
        <CategoryIconSlick data={categorySlick} />
        {users &&
          users.map(user => {
            return <UserDisplayComponent user={user} />;
          })}
      </PageLayout>
    </>
  );
};

export default ListingCatalogueView;
