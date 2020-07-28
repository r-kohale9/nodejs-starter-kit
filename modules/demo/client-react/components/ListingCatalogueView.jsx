import React from 'react';
import { Row, Col, Spin, Icon } from 'antd';
import { PropTypes } from 'prop-types';
import PageLayout from './PageLayout';
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
        <Row type="flex">
          <Col span={24}>
            <HomeSlick data={homeSlick} />
          </Col>
          <Col span={24}>
            <CategoryIconSlick data={categorySlick} />
          </Col>
          <Col span={24}>
            <div onClick={() => history.push('/demo/filters')}>
              <Row type="flex" justify="end">
                <p style={{ display: 'inline-flex' }}>
                  <Icon type="filter" style={{ fontSize: '20px', paddingRight: '5px' }} />
                  Filters
                </p>
              </Row>
            </div>
          </Col>
          <Col span={24}>{users && users.totalCount ? <RenderUsers /> : !loading ? <Spin /> : null}</Col>
        </Row>
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
