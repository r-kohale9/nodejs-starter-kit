import React from 'react';
import { Spin } from 'antd';
import { PropTypes } from 'prop-types';
import PageLayout from './PageLayout';
import Avatar from '../Icons/userimage.svg';
import SuggestedListComponent from './SuggestedListComponent';

import UserDisplayComponent from './UserDisplayComponent';
import HomeSlick from './HomeSlick';
import CategoryIconSlick from './CategoryIconSlick';

const ListingCatalogueView = props => {
  const { history, homeSlick, users, loading, categorySlick } = props;
  const renderFunc = (key, user) => <UserDisplayComponent user={user} key={key} />;
  const RenderUsers = () => (
    <div>
      <SuggestedListComponent items={users} {...props} renderFunc={renderFunc} />
    </div>
  );
  return (
    <>
      <PageLayout showMenuBar={true} selectedTab="HOME" history={history}>
        <HomeSlick data={homeSlick} />
        <CategoryIconSlick data={categorySlick} />
        {users && users.totalCount ? <RenderUsers /> : !loading ? <Spin /> : null}
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
