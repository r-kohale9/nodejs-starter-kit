/* eslint-disable react/display-name */
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Table,
  Pagination,
  EditIcon,
  DeleteIcon,
  EmptyComponent,
  RenderTableLoading,
  Divider
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { displayDataCheck } from '@gqlapp/listing-client-react';

import ROUTES from '../../routes';

// types
import { dynamicCarousel_dynamicCarousel as DynamicCarousel } from '../../graphql/__generated__/dynamicCarousel';
import { DynamicCarouselViewProps } from './DynamicCarouselView';

const { itemsNumber, type } = settings.pagination.web;

export interface DynamicCarouselListViewProps extends DynamicCarouselViewProps {}

const DynamicCarouselListView: React.FC<DynamicCarouselListViewProps> = props => {
  const { loading, t, orderBy, onDynamicCarouselOrderBy, deleteDynamicCarousel, dynamicCarousels, loadData } = props;
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
        return onDynamicCarouselOrderBy({
          column: '',
          order: ''
        });
      }
    }
    return onDynamicCarouselOrderBy({ column: name, order });
  };
  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'id')} href="#">
          {t('dynamicCarousel.columns.carouselId')}
          {renderOrderByArrow('id')}
        </a>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text: string, record: DynamicCarousel) => <>{record.id}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'title')} href="#">
          {t('dynamicCarousel.columns.title')}
          {renderOrderByArrow('title')}
        </a>
      ),
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: DynamicCarousel) => <>{record.title}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'image')} href="#">
          {t('dynamicCarousel.columns.image')}
          {renderOrderByArrow('image')}
        </a>
      ),
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text: string, record: DynamicCarousel) => (
        <>
          <img src={record.imageUrl} width="200px" />
        </>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'label')} href="#">
          {t('dynamicCarousel.columns.label')}
          {renderOrderByArrow('label')}
        </a>
      ),
      dataIndex: 'label',
      key: 'label',
      render: (text: string, record: DynamicCarousel) => <>{displayDataCheck(record.label)}</>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'link')} href="#">
          {t('dynamicCarousel.columns.link')}
          {renderOrderByArrow('link')}
        </a>
      ),
      dataIndex: 'link',
      key: 'link',
      render: (text: string, record: DynamicCarousel) => <>{displayDataCheck(record.link)}</>
    },
    {
      title: t('dynamicCarousel.columns.actions'),
      align: 'end',
      key: 'actions',
      render: (text: string, record: DynamicCarousel) => (
        <div align="center">
          <Link to={`${ROUTES.editLink}${record.id}`}>
            <EditIcon shape="circle" size="large" />
          </Link>
          <Divider type="vertical" />
          <DeleteIcon onClick={() => deleteDynamicCarousel(record.id)} title="Are you sure delete this listing?" />
        </div>
      )
    }
  ];
  const handlePageChange = (pagination: string, pageNumber: number) => {
    const {
      pageInfo: { endCursor }
    } = dynamicCarousels;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };
  const RenderDynamicCarousels = () => (
    <>
      <Table dataSource={dynamicCarousels.edges.map(({ node }) => node)} columns={columns} />
      <div align="center">
        <Pagination
          itemsPerPage={dynamicCarousels.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={dynamicCarousels.pageInfo.hasNextPage}
          pagination={type}
          total={dynamicCarousels.totalCount}
          loadMoreText="Load more"
          defaultPageSize={itemsNumber}
        />
      </div>
    </>
  );

  return (
    <div style={{ overflowX: 'auto', minHeight: '100vh', position: 'relative' }}>
      {loading && <RenderTableLoading columns={columns} />}
      {/* Render main listing content */}
      {dynamicCarousels && dynamicCarousels.totalCount ? (
        <RenderDynamicCarousels />
      ) : (
        !loading && (
          <EmptyComponent description={t('dynamicCarousel.adminPanel.noBannersMsg')} emptyLink={`${ROUTES.add}`} />
        )
      )}
    </div>
  );
};

export default DynamicCarouselListView;
