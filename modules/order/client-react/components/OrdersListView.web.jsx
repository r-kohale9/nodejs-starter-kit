/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { Table, Button, Pagination } from '@gqlapp/look-client-react';
import ListingDrawerComponent from '@gqlapp/demo-client-react/components/ListingDrawerComponent';
// import ListingDrawerComponent from './ListingDrawerComponent';

import settings from '../../../../settings';

const { itemsNumber, type } = settings.pagination.web;
const { Meta } = Card;

const NoOrderssMessage = ({ t }) => <div className="text-center">{t('order.noListingsMsg')}</div>;
NoOrderssMessage.propTypes = { t: PropTypes.func };

const Loading = ({ t }) => <Spin text={t('order.loadMsg')} />;
Loading.propTypes = { t: PropTypes.func };

const OrdersView = ({ deleteOrder, onOrdersOrderBy, orderBy, loading, orders, t, loadData }) => {
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
        return onOrdersOrderBy({
          column: '',
          order: ''
        });
      }
    }
    return onOrdersOrderBy({ column: name, order });
  };

  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'id')} href="#">
          OrderId
          {renderOrderByArrow('id')}
        </a>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <>
          {record.id}
          {/* {console.log(record)} */}
        </>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'state')} href="#">
          State
          {renderOrderByArrow('state')}
        </a>
      ),
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => <>{record.state}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'createdAt')} href="#">
          State
          {renderOrderByArrow('createdAt')}
        </a>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => <>{record.createdAt}</>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <ListingDrawerComponent listing={record.orderDetails} />
          <Button color="primary" size="sm" onClick={() => deleteOrder(record.id)}>
            Delete
          </Button>
        </>
      )
    }
  ];

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = orders;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderOrders = () => (
    <Fragment>
      <Table dataSource={orders.edges.map(({ node }) => node)} columns={columns} />
      <Pagination
        itemsPerPage={orders.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={orders.pageInfo.hasNextPage}
        pagination={type}
        total={orders.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={itemsNumber}
      />
    </Fragment>
  );

  return (
    <>
      {/* Render loader */}
      {loading && !orders && <Loading t={t} />}
      {/* Render main orders content */}
      {orders && orders.totalCount ? <RenderOrders /> : <NoOrderssMessage t={t} />}
    </>
  );
};

OrdersView.propTypes = {
  loading: PropTypes.bool.isRequired,
  orders: PropTypes.array,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('user')(OrdersView);
