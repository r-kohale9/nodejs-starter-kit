/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popconfirm, Icon, message, Spin } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { Table, Button, Pagination } from '@gqlapp/look-client-react';

import settings from '../../../../settings';

const { itemsNumber, type } = settings.pagination.web;

const Loading = ({ t }) => <Spin text={t('review.loadMsg')} />;
Loading.propTypes = { t: PropTypes.func };

const NoReviewsMessage = ({ t }) => <div className="text-center">{t('review.noReviewsMsg')}</div>;
NoReviewsMessage.propTypes = { t: PropTypes.func };

const cancel = () => {
  message.error('Click on No');
};

const ReviewListComponent = props => {
  const { orderBy, onOrderBy, loading, allReviews, t, loadData, deleteReview } = props;

  const renderOrderByArrow = name => {
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'desc') {
        return <span className="badge badge-primary">&#8595;</span>;
      } else {
        return <span className="badge badge-primary">&#8593;</span>;
      }
    } else {
      return <span className="badge badge-secondary">&#8645;</span>;
    }
  };
  const handleOrderBy = (e, name) => {
    e.preventDefault();
    let order = 'asc';
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'asc') {
        order = 'desc';
      } else if (orderBy.order === 'desc') {
        return onOrderBy({
          column: '',
          order: ''
        });
      }
    }
    return onOrderBy({ column: name, order });
  };

  const columns = [
    {
      title: (
        <a
          // onClick={e => handleOrderBy(e, "owner")}
          href="#"
        >
          {'Owner'}
          {/* {renderOrderByArrow("owner")} */}
        </a>
      ),
      dataIndex: 'owner',
      key: 'owner',
      render: (text, record) => (
        <Link to={`/public-profile/${record && record.userId}`}>
          {console.log('record', record)}
          {record && record.user && record.user.username}
        </Link>
      )
    },
    {
      title: (
        <a
          // onClick={e => handleOrderBy(e, "baker")}
          href="#"
        >
          {'Reviewed baker'}
          {/* {renderOrderByArrow("baker")} */}
        </a>
      ),
      dataIndex: 'baker',
      key: 'baker',
      render: (text, record) => (
        <Link to={`/baker/${record && record.userId}`}>{record && record.baker && record.baker.username}</Link>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'rating')} href="#">
          Rating {renderOrderByArrow('rating')}
        </a>
      ),
      dataIndex: 'rating',
      key: 'rating',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'feedback')} href="#">
          Review {renderOrderByArrow('feedback')}
        </a>
      ),
      dataIndex: 'feedback',
      key: 'feedback',
      render: text => <div>{text}</div>
    },

    {
      title: t('list.column.actions'),
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <div>
          <Link className="review-link" to={`/edit/review/${record.id}`}>
            <Button color="primary" size="sm">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure delete this review?"
            onConfirm={() => deleteReview(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" shape="circle" size="sm">
              <Icon type="delete" />
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = allReviews;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderReviews = () => (
    <Fragment>
      <Table dataSource={allReviews.edges.map(({ node }) => node)} columns={columns} />
      <Pagination
        itemsPerPage={allReviews.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={allReviews.pageInfo.hasNextPage}
        pagination={type}
        total={allReviews.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={itemsNumber}
      />
    </Fragment>
  );

  return (
    <div>
      {/* Render loader */}
      {loading && !allReviews && <Loading t={t} />}
      {/* Render main review content */}
      {allReviews && allReviews.totalCount ? <RenderReviews /> : <NoReviewsMessage t={t} />}
    </div>
  );
};

ReviewListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadData: PropTypes.bool,
  allReviews: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  t: PropTypes.func,
  history: PropTypes.object
};

export default translate('review')(ReviewListComponent);
