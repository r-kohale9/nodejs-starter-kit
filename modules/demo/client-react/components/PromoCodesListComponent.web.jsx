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

const NoPromoCodesMessage = ({ t }) => <div className="text-center">{t('demo.noPromoCodesMsg')}</div>;
NoPromoCodesMessage.propTypes = { t: PropTypes.func };

const cancel = () => {
  message.error('Click on No');
};

const PromoCodeListComponent = props => {
  const { orderBy, onOrderBy, loading, getPromoCodes, t, loadData, deletePromoCode } = props;

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
    // {
    //   title: (
    //     <a
    //       // onClick={e => handleOrderBy(e, "owner")}
    //       href="#"
    //     >
    //       {'Owner'}
    //       {/* {renderOrderByArrow("owner")} */}
    //     </a>
    //   ),
    //   dataIndex: 'owner',
    //   key: 'owner',
    //   render: (text, record) => (
    //     <Link to={`/public-profile/${record && record.userId}`}>
    //       {console.log('record', record)}
    //       {record && record.user && record.user.username}
    //     </Link>
    //   )
    // },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'title')} href="#">
          Rating {renderOrderByArrow('title')}
        </a>
      ),
      dataIndex: 'title',
      key: 'title',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'promoCode')} href="#">
          PromoCode {renderOrderByArrow('promoCode')}
        </a>
      ),
      dataIndex: 'promoCode',
      key: 'promoCode',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'validity')} href="#">
          Validity {renderOrderByArrow('validity')}
        </a>
      ),
      dataIndex: 'validity',
      key: 'validity',
      render: text => <div>{text} days</div>
    },

    {
      title: t('list.column.actions'),
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <div>
          <Link className="promocode-link" to={`/edit/promocode/${record.id}`}>
            <Button color="primary" size="sm">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure delete this promocode?"
            onConfirm={() => deletePromoCode(record.id)}
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
    } = getPromoCodes;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderPromoCodes = () => (
    <Fragment>
      <Table dataSource={getPromoCodes.edges.map(({ node }) => node)} columns={columns} />
      <Pagination
        itemsPerPage={getPromoCodes.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={getPromoCodes.pageInfo.hasNextPage}
        pagination={type}
        total={getPromoCodes.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={itemsNumber}
      />
    </Fragment>
  );

  return (
    <div>
      {/* Render loader */}
      {loading && !getPromoCodes && <Loading t={t} />}
      {/* Render main promocode content */}
      {getPromoCodes && getPromoCodes.totalCount ? <RenderPromoCodes /> : <NoPromoCodesMessage t={t} />}
    </div>
  );
};

PromoCodeListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadData: PropTypes.bool,
  getPromoCodes: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deletePromoCode: PropTypes.func.isRequired,
  t: PropTypes.func,
  history: PropTypes.object
};

export default translate('demo')(PromoCodeListComponent);
