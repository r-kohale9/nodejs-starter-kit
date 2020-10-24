/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Empty, Divider, Tooltip, Button, Icon } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { Select, Option, Table, Pagination, EditIcon, DeleteIcon } from '@gqlapp/look-client-react';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import settings from '../../../../settings';
import ROUTES from '../routes';
import { displayDataCheck } from './functions';

const { itemsNumber, type } = settings.pagination.web;

const Loading = () => <Spinner />;
Loading.propTypes = { t: PropTypes.func };

const NoListingsMessage = ({ t }) => (
  <div align="center">
    <br />
    <br />
    <br />
    <Empty description={t('listing.noListingsMsg')}>
      <Link to={`${ROUTES.add}`}>
        <Button type="primary">Add</Button>
      </Link>
    </Empty>
  </div>
);
NoListingsMessage.propTypes = { t: PropTypes.func };

const ListingListComponent = props => {
  const { onToggle, orderBy, onOrderBy, loading, listings, t, loadData, deleteListing, onDuplicate } = props;

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
        <a onClick={e => handleOrderBy(e, 'user.username')} href="#">
          Created by {renderOrderByArrow('user.username')}
        </a>
      ),
      width: 130,
      fixed: 'left',
      dataIndex: 'user.username',
      key: 'user.username',
      render: (text, record) => <div>{record.user && displayDataCheck(record.user.username)}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'title')} href="#">
          Title {renderOrderByArrow('title')}
        </a>
      ),
      width: 100,
      fixed: 'left',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a href={`${ROUTES.listingDetailLink}${record.id}`} rel="noopener noreferrer" target="_blank">
          {displayDataCheck(text)}
        </a>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'is_active')} href="#">
          {t('Active')} {renderOrderByArrow('is_active')}
        </a>
      ),
      width: 120,
      fixed: 'left',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) => (
        <Select
          name="role"
          defaultValue={text}
          style={{ width: '90px' }}
          onChange={e => onToggle('isActive', e, record.id)}
        >
          <Option key={0} value={true}>
            Active
          </Option>
          <Option key={1} value={false}>
            In-active
          </Option>
        </Select>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_cost.cost')} href="#">
          {'Cost'} {renderOrderByArrow('listing_cost.cost')}
        </a>
      ),
      width: 100,
      fixed: 'left',
      dataIndex: 'listingCostArray.cost',
      key: 'listing_cost.cost',
      render: (text, record) => (
        <>
          {/* {console.log('record', record)} */}
          &#8377;{' '}
          {record.listingCostArray &&
            record.listingCostArray.length > 0 &&
            record.listingCostArray[0].cost &&
            displayDataCheck(record.listingCostArray[0].cost.toFixed(2))}
        </>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_flag.isFeatured')} href="#">
          {'Featured'} {renderOrderByArrow('listing_flag.isFeatured')}
        </a>
      ),
      width: 120,
      dataIndex: 'listingFlags.isFeatured',
      key: 'listing_flag.isFeatured',
      render: (text, record) => (
        <Select
          name="role"
          defaultValue={record.listingFlags && record.listingFlags.isFeatured}
          style={{ width: '110px' }}
          onChange={e => onToggle('listingFlags', { id: record.listingFlags.id, isFeatured: e }, record.id)}
        >
          <Option key={0} value={true}>
            Featured
          </Option>
          <Option key={1} value={false}>
            Not featured
          </Option>
        </Select>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_flag.isNew')} href="#">
          {'New'} {renderOrderByArrow('listing_flag.isNew')}
        </a>
      ),
      width: 100,
      dataIndex: 'listingFlags.isNew',
      key: 'listing_flag.isNew',
      render: (text, record) => (
        <>
          <Select
            name="role"
            defaultValue={record.listingFlags && record.listingFlags.isNew}
            style={{ width: '80px' }}
            onChange={e => onToggle('listingFlags', { id: record.listingFlags.id, isNew: e }, record.id)}
          >
            <Option key={0} value={true}>
              New
            </Option>
            <Option key={1} value={false}>
              Old
            </Option>
          </Select>
        </>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_flag.isDiscount')} href="#">
          {'Discount'} {renderOrderByArrow('listing_flag.isDiscount')}
        </a>
      ),
      width: 120,
      dataIndex: 'listingFlags.isDiscount',
      key: 'listing_flag.isDiscount',
      render: (text, record) => <>{record.listingFlags && displayDataCheck(record.listingFlags.isDiscount, true)}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_cost.discount')} href="#">
          {'Discount'} {renderOrderByArrow('listing_cost.discount')}
        </a>
      ),
      width: 100,
      dataIndex: 'listingCostArray.discount',
      key: 'listing_cost.discount',
      render: (text, record) => (
        <>
          {record.listingFlags && record.listingFlags.isDiscount
            ? record.listingCostArray &&
              record.listingCostArray.length > 0 &&
              record.listingCostArray[0].discount &&
              displayDataCheck(record.listingCostArray[0].discount.toFixed(2))
            : 'Not applicable'}
        </>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listing_option.fixedQuantity')} href="#">
          {'Fixed Quantity'} {renderOrderByArrow('listing_option.fixedQuantity')}
        </a>
      ),
      width: 180,
      dataIndex: 'listingOptions.fixedQuantity',
      key: 'listing_option.fixedQuantity',
      render: (text, record) => <>{record.listingOptions && displayDataCheck(record.listingOptions.fixedQuantity)}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'listingDetail.inventoryCount')} href="#">
          {'Inventory Count'} {renderOrderByArrow('listingDetail.inventoryCount')}
        </a>
      ),
      width: 200,
      dataIndex: 'listingDetail.inventoryCount',
      key: 'listingDetail.inventoryCount',
      render: (text, record) => <>{record.listingDetail && displayDataCheck(record.listingDetail.inventoryCount)}</>
    },
    {
      title: t('list.column.actions'),
      key: 'actions',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <div align="center">
          <Link className="listing-link" to={`${ROUTES.editLink}${record.id}`}>
            <EditIcon />
          </Link>
          <Divider type="vertical" />
          <Tooltip title="Duplicate Listing">
            <Button type="primary" shape="circle" size="sm" onClick={() => onDuplicate(record.id)}>
              <Icon type="copy" />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <DeleteIcon onClick={() => deleteListing(record.id)} title="Are you sure delete this listing?" />
        </div>
      )
    }
  ];

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = listings;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderListings = () => (
    <Fragment>
      <Table scroll={{ x: 1300 }} dataSource={listings.edges.map(({ node }) => node)} columns={columns} />
      <div align="center">
        <Pagination
          itemsPerPage={listings.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={listings.pageInfo.hasNextPage}
          pagination={type}
          total={listings.totalCount}
          loadMoreText={t('list.btn.more')}
          defaultPageSize={itemsNumber}
        />
      </div>
    </Fragment>
  );

  return (
    <>
      {/* Render loader */}
      {loading && !listings && <Loading t={t} />}
      {/* Render main listing content */}
      {listings && listings.totalCount ? <RenderListings /> : !loading && <NoListingsMessage t={t} />}
    </>
  );
};

ListingListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadData: PropTypes.bool,
  listings: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteListing: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  t: PropTypes.func,
  onDuplicate: PropTypes.func,
  history: PropTypes.object
};

export default translate('listing')(ListingListComponent);
