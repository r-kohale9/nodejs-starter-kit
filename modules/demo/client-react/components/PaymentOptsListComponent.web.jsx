/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popconfirm, Icon, message, Spin } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { Table, Button, Pagination } from '@gqlapp/look-client-react';

import settings from '../../../../settings';

const { itemsNumber, type } = settings.pagination.web;

const Loading = ({ t }) => <Spin text={t('demo.loadMsg')} />;
Loading.propTypes = { t: PropTypes.func };

const NoPaymentOptsMessage = ({ t }) => <div className="text-center">{t('demo.noPaymentOptsMsg')}</div>;
NoPaymentOptsMessage.propTypes = { t: PropTypes.func };

const cancel = () => {
  message.error('Click on No');
};

const PaymentOptListComponent = props => {
  const { orderBy, onOrderBy, loading, paymentOpts, t, loadData, deletePaymentOpt } = props;

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
        <a onClick={e => handleOrderBy(e, 'owner')} href="#">
          Name on card {renderOrderByArrow('owner')}
        </a>
      ),
      dataIndex: 'owner',
      key: 'owner',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'cardNumber')} href="#">
          Card Number {renderOrderByArrow('cardNumber')}
        </a>
      ),
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'expiryDate')} href="#">
          Expiry Date {renderOrderByArrow('expiryDate')}
        </a>
      ),
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: text => <div>{text}</div>
    },

    {
      title: t('list.column.actions'),
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <div>
          <Link className="paymentopts-link" to={`/edit/paymentopts/${record.id}`}>
            <Button color="primary" size="sm">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure delete this paymentopts?"
            onConfirm={() => deletePaymentOpt(record.id)}
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
    } = paymentOpts;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderPaymentOpts = () => (
    <Fragment>
      <Table dataSource={paymentOpts.edges.map(({ node }) => node)} columns={columns} />
      <Pagination
        itemsPerPage={paymentOpts.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={paymentOpts.pageInfo.hasNextPage}
        pagination={type}
        total={paymentOpts.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={itemsNumber}
      />
    </Fragment>
  );

  return (
    <div>
      {/* Render loader */}
      {loading && !paymentOpts && <Loading t={t} />}
      {/* Render main paymentopts content */}
      {paymentOpts && paymentOpts.totalCount ? <RenderPaymentOpts /> : <NoPaymentOptsMessage t={t} />}
    </div>
  );
};

PaymentOptListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadData: PropTypes.bool,
  paymentOpts: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deletePaymentOpt: PropTypes.func.isRequired,
  t: PropTypes.func,
  history: PropTypes.object
};

export default translate('demo')(PaymentOptListComponent);