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

const OrdersView = ({ deleteOrder, orderBy, onOrderBy, loading, orders, t, toggleFeatured, loadData }) => {
  // const renderOrderByArrow = name => {
  //   if (orderBy && orderBy.column === name) {
  //     if (orderBy.order === 'desc') {
  //       return <span className="badge badge-primary">&#8595;</span>;
  //     } else {
  //       return <span className="badge badge-primary">&#8593;</span>;
  //     }
  //   } else {
  //     return <span className="badge badge-secondary">&#8645;</span>;
  //   }
  // };

  // const handleOrderBy = (e, name) => {
  //   e.preventDefault();

  //   let order = 'asc';
  //   if (orderBy && orderBy.column === name) {
  //     if (orderBy.order === 'asc') {
  //       order = 'desc';
  //     } else if (orderBy.order === 'desc') {
  //       return onOrderBy({
  //         column: '',
  //         order: ''
  //       });
  //     }
  //   }

  //   return onOrderBy({ column: name, order });
  // };
  const getName = (firstName, lastName) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName && !lastName) {
      return firstName;
    } else {
      return 'Name Not Available';
    }
  };

  const columns = [
    {
      title: (
        <>
          OrderId
          {/* <a onClick={e => handleOrderBy(e, 'username')} href="#">
          {t('orders.column.name')} {renderOrderByArrow('username')}
        </a> */}
        </>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <>
          {record.id}
          {console.log(record)}
        </>
      )
    },
    {
      title: <>State</>,
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => <>{record.state}</>
    },
    // {
    //   title: (
    //     <>
    //       {'title'}
    //       {/* <a onClick={e => handleOrderBy(e, 'fullName')} href="#">
    //       {'Name'} {renderOrderByArrow('fullName')}
    //     </a> */}
    //     </>
    //   ),
    //   dataIndex: 'title',
    //   key: 'title',
    //   render: (text, record) => (
    //     <>
    //       {record && record.title}
    //       {text}
    //     </>
    //     // <Link className="user-link" to={`/public-profile/${record.user && record.user.id}`}>
    //     //   <Card style={{ width: 'fit-content', maxWidth: '300px' }} bodyStyle={{ padding: '5px' }}>
    //     //     <Meta
    //     //       avatar={<Avatar src={record.user && record.user.profile && record.user.profile.avatar} />}
    //     //       title={getName(
    //     //         record.user && record.user.profile && record.user.profile.firstName,
    //     //         record.user && record.user.profile && record.user.profile.lastName
    //     //       )}
    //     //       description={<h4 style={{ marginTop: '-10px' }}>{record.user && record.user.username}</h4>}
    //     //     />
    //     //   </Card>
    //     // </Link>
    //   )
    // },
    // {
    //   title: (
    //     <a onClick={e => handleOrderBy(e, 'email')} href="#">
    //       {t('orders.column.email')} {renderOrderByArrow('email')}
    //     </a>
    //   ),
    //   dataIndex: 'email',
    //   key: 'email'
    // },
    // {
    //   title: (
    //     <a onClick={e => handleOrderBy(e, 'role')} href="#">
    //       {t('orders.column.role')} {renderOrderByArrow('role')}
    //     </a>
    //   ),
    //   dataIndex: 'role',
    //   key: 'role'
    // },
    // {
    //   title: (
    //     <a onClick={e => handleOrderBy(e, 'isActive')} href="#">
    //       {t('orders.column.active')} {renderOrderByArrow('isActive')}
    //     </a>
    //   ),
    //   dataIndex: 'isActive',
    //   key: 'isActive',
    //   render: text => text.toString()
    // },
    // {
    //   title: (
    //     <a
    //       // onClick={e => handleOrderBy(e, "isActive")}
    //       href="#"
    //     >
    //       Type
    //     </a>
    //   ),
    //   dataIndex: 'profile',
    //   key: 'profile',
    //   render: (text, record) => record.profile && record.profile.userType && record.profile.userType.toString()
    // },
    // {
    //   title: (
    //     <a onClick={e => handleOrderBy(e, 'isFeatured')} href="#">
    //       {'Is Featured'} {renderOrderByArrow('isFeatured')}
    //     </a>
    //   ),
    //   dataIndex: 'isFeatured',
    //   key: 'isFeatured',
    //   render: (text, record) => (
    //     <Button onClick={() => toggleFeatured(record.id)}>
    //       {record.profile && record.profile.isFeatured ? 'Featured' : 'UnFeatured'}
    //     </Button>
    //   )
    // },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          {/* <Button color="primary" size="sm" onClick={() => deleteOrder(record.id)}>
            View
          </Button> */}
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
      {/* Render main listing content */}
      {orders && orders.totalCount ? <RenderOrders /> : <NoOrderssMessage t={t} />}
      {/* <div style={{ overflowX: 'auto' }}>
          <Table dataSource={orders} columns={columns} />
        </div> */}
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
