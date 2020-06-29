import React from 'react';
import { PropTypes } from 'prop-types';
import PageLayout from './PageLayout';
import Avatar from '../Icons/userimage.svg';

import UserDisplayComponent from './UserDisplayComponent';
import HomeSlick from './HomeSlick';
import CategoryIconSlick from './CategoryIconSlick';

const ListingCatalogueView = props => {
  const { history, homeSlick, categorySlick } = props;
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
      <PageLayout showMenuBar={true} selectedTab="HOME" history={history}>
        <HomeSlick data={homeSlick} />
        <CategoryIconSlick data={categorySlick} />
        {users && users.map(user => <UserDisplayComponent user={user} />)}
      </PageLayout>
    </>
  );
};

ListingCatalogueView.propTypes = {
  users: PropTypes.object,
  history: PropTypes.object,
  homeSlick: PropTypes.array,
  categorySlick: PropTypes.array
};

export default ListingCatalogueView;
