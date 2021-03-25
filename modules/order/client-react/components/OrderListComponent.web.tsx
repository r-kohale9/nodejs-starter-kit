/* eslint-disable react/display-name */
import React from 'react';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import {
  Space,
  Divider,
  Select,
  Option,
  Table,
  Pagination,
  ViewIcon,
  EmptyComponent,
  DeleteIcon,
  RenderTableLoading
} from '@gqlapp/look-client-react';
import { ORDER_STATES } from '@gqlapp/order-common';
import { USER_ROUTES } from '@gqlapp/user-client-react';
import { displayDataCheck } from '@gqlapp/listing-client-react';
import { displayDateCheck } from '@gqlapp/review-client-react';
import settings from '@gqlapp/config';

import OrderStatusMail from '../containers/OrderStatusMail';
import ROUTES from '../routes';

// types
import { order_order as Order } from '../graphql/__generated__/order';
import { OrderViewProps } from './OrdersView';
import { handleDelete } from '@gqlapp/listing-client-react';

const { itemsNumber, type } = settings.pagination.web;

export interface OrderListComponentProps extends OrderViewProps {
  //
}

const OrderListComponent: React.FC<OrderListComponentProps> = props => {
  const { onPatchOrderState, orderBy, onOrderBy, loading, orders, t, loadData, deleteOrder, orderStates } = props;

  const renderOrderByArrow = (name: string) => {
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
  const handleOrderBy = (e: React.SyntheticEvent, name: string) => {
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
        <a onClick={e => handleOrderBy(e, 'id')} href="#">
          {t('orders.column.orderId')}
          {renderOrderByArrow('id')}
        </a>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text: string, record: Order) => <div>{record && displayDataCheck(record.id)}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'consumer.username')} href="#">
          {t('orders.column.consumer')} {renderOrderByArrow('consumer.username')}
        </a>
      ),
      dataIndex: 'consumer',
      key: 'consumer',
      render: (text: string, record: Order) => (
        <a
          href={`${USER_ROUTES.userPublicProfileLink}${record.consumer.id}`}
          target={'_blank'}
          rel="noopener noreferrer"
        >
          {record.consumer && displayDataCheck(record.consumer.username)}
        </a>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'order_state.state')} href="#">
          {t('orders.column.state')} {renderOrderByArrow('order_state.state')}
        </a>
      ),
      dataIndex: 'state',
      key: 'state',
      render: (text: string, record: Order) => (
        <Select
          name="state"
          defaultValue={record.orderState && record.orderState.state}
          style={{ width: '125px' }}
          onChange={e => onPatchOrderState(record.id, e)}
        >
          {orderStates &&
            orderStates.map((oS: { state: string }, i: number) => (
              <Option key={i + 1} value={oS.state}>
                {oS.state}
              </Option>
            ))}
        </Select>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'createdAt')} href="#">
          {t('orders.column.createdAt')}
          {renderOrderByArrow('createdAt')}
        </a>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string, record: Order) => <>{displayDateCheck(record.createdAt)}</>
    },
    {
      title: t('orders.column.actions'),
      align: 'end',
      key: 'actions',
      render: (text: string, record: Order) => (
        <Space align="center">
          {record.orderState.state !== ORDER_STATES.STALE && (
            <Link to={`${ROUTES.orderDetailLink}${record.id}`}>
              <ViewIcon />
            </Link>
          )}
          <Divider type="vertical" />
          <OrderStatusMail orderId={record.id} disabled={record.orderState.state !== ORDER_STATES.DISPATCHED} />
          <Divider type="vertical" />
          <DeleteIcon title="Are you sure delete this order?" onClick={() => handleDelete(deleteOrder, record.id)} />
        </Space>
      )
    }
  ];

  const handlePageChange = (pagination: string, pageNumber: number) => {
    const {
      pageInfo: { endCursor }
    } = orders;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderOrders = () => (
    <>
      <Table dataSource={orders.edges.map(({ node }) => node)} columns={columns} />
      <br />
      <div align="center">
        <Pagination
          itemsPerPage={orders.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={orders.pageInfo.hasNextPage}
          pagination={type}
          total={orders.totalCount}
          loadMoreText={t('orders.btn.more')}
          defaultPageSize={itemsNumber}
        />
      </div>
    </>
  );

  return (
    <div style={{ overflowX: 'auto', minHeight: '100vh', position: 'relative' }}>
      {/* Render loader */}
      {loading && <RenderTableLoading columns={columns} />}
      {/* Render main order content */}
      {orders && orders.totalCount ? (
        <RenderOrders />
      ) : (
        !loading && <EmptyComponent description={t('noOrdersMsg')} emptyLink={`${ROUTES.add}`} />
      )}
    </div>
  );
};

export default translate('order')(OrderListComponent);
