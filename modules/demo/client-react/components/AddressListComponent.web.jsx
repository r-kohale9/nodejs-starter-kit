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

const NoAddressMessage = ({ t }) => <div className="text-center">{t('demo.noAddressMsg')}</div>;
NoAddressMessage.propTypes = { t: PropTypes.func };

const cancel = () => {
  message.error('Click on No');
};

const AddressListComponent = props => {
  const { orderBy, onOrderBy, loading, addresses, t, loadData, deleteAddress } = props;

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
        <a onClick={e => handleOrderBy(e, 'addressName')} href="#">
          Address Name {renderOrderByArrow('addressName')}
        </a>
      ),
      dataIndex: 'addressName',
      key: 'addressName',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'shippingAddress')} href="#">
          Address {renderOrderByArrow('shippingAddress')}
        </a>
      ),
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'city')} href="#">
          City {renderOrderByArrow('city')}
        </a>
      ),
      dataIndex: 'city',
      key: 'city',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'country')} href="#">
          Country {renderOrderByArrow('country')}
        </a>
      ),
      dataIndex: 'country',
      key: 'country',
      render: text => <div>{text}</div>
    },
    {
      title: t('list.column.actions'),
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <div>
          <Link className="address-link" to={`/edit/address/${record.id}`}>
            <Button color="primary" size="sm">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure delete this address?"
            onConfirm={() => deleteAddress(record.id)}
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
    } = addresses;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderAddress = () => (
    <Fragment>
      <Table dataSource={addresses.edges.map(({ node }) => node)} columns={columns} />
      <Pagination
        itemsPerPage={addresses.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={addresses.pageInfo.hasNextPage}
        pagination={type}
        total={addresses.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={itemsNumber}
      />
    </Fragment>
  );

  return (
    <div>
      {/* Render loader */}
      {loading && !addresses && <Loading t={t} />}
      {/* Render main address content */}
      {addresses && addresses.totalCount ? <RenderAddress /> : <NoAddressMessage t={t} />}
    </div>
  );
};

AddressListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadData: PropTypes.bool,
  addresses: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteAddress: PropTypes.func.isRequired,
  t: PropTypes.func,
  history: PropTypes.object
};

export default translate('demo')(AddressListComponent);
