/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import { useQuery } from 'react-apollo';

import { translate } from '@gqlapp/i18n-client-react';
import {
  Icon,
  Select,
  Option,
  Table,
  Pagination,
  EditIcon,
  DeleteIcon,
  EmptyComponent,
  Divider,
  Avatar,
  RenderTableLoading,
  Spin,
  CardMeta,
  Card
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { LISTING_ROUTES, displayDataCheck } from '@gqlapp/listing-client-react';
import { NO_IMG } from '@gqlapp/listing-common';

import CATEGORY_QUERY from '../graphql/CategoryQuery.graphql';
import ROUTES from '../routes';
// import { withCategory } from '../containers/CategoryOpertations';

// types
import { category_category as Category } from '../graphql/__generated__/category';
import { CategoriesViewProps } from './CategoriesView.web';

const { itemsNumber, type } = settings.pagination.web;

export interface CategoryListComponentProps extends CategoriesViewProps {
  onToggle: (field: string, value: boolean, id: number) => void;
}

const CategoryListComponent: React.FC<CategoryListComponentProps> = props => {
  const { onToggle, orderBy, onOrderBy, loading, categories, t, loadData, deleteCategory /*, onDuplicate */ } = props;

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
  const handleOrderBy = (name: string) => {
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
        <a onClick={e => handleOrderBy('id')} href="#">
          {/* {t('category.column.id')} */}
          {'Id'}
          {renderOrderByArrow('id')}
        </a>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text: string /* , record */) => displayDataCheck(text)
    },
    {
      title: (
        <a onClick={e => handleOrderBy('title')} href="#">
          {t('category.column.listTitle')} {renderOrderByArrow('title')}
        </a>
      ),
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Category) => (
        <a href={`${LISTING_ROUTES.categoryCatalogueLink}${record.id}`} rel="noopener noreferrer" target="_blank">
          <Card style={{ width: '200px', height: '60px' }} bodyStyle={{ padding: '10px' }}>
            <CardMeta
              title={
                <>
                  <div style={{ width: '100%', marginTop: '10px' }} />
                  {displayDataCheck(text)}
                </>
              }
              avatar={<Avatar size={46} src={record.imageUrl || NO_IMG} alt="" />}
            />
          </Card>
        </a>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy('is_active')} href="#">
          {t('category.column.active')} {renderOrderByArrow('is_active')}
        </a>
      ),
      dataIndex: 'isActive',
      align: 'center',
      key: 'isActive',
      render: (text: string, record: Category) => (
        <Select
          name="role"
          defaultValue={text ? 0 : 1}
          style={{ width: '90px' }}
          onChange={(e: number) => onToggle('isActive', e === 0 ? true : false, record.id)}
        >
          <Option key={0} value={0}>
            Active
          </Option>
          <Option key={1} value={1}>
            In-active
          </Option>
        </Select>
      )
    },

    {
      title: t('category.column.actions'),
      align: 'end',
      key: 'actions',
      render: (text: string, record: Category) => (
        <div
        // align="center"
        >
          <a className="listing-link" href={`${ROUTES.editLink}${record.id}`}>
            <EditIcon />
          </a>
          <Divider type="vertical" />
          {/* <Tooltip title="Duplicate Listing">
            <Button color="primary" shape="circle" onClick={() => onDuplicate(record.id)}>
              <Icon type="CopyOutlined" />
            </Button>
          </Tooltip> */}
          {/* <Divider type="vertical" /> */}
          <DeleteIcon onClick={() => deleteCategory(record.id)} title="Are you sure delete this listing?" />
        </div>
      )
    }
  ];

  const ExpandedRowRender = ({ record }: { record: Category }) => {
    const { loading: categoryLoading, data } = useQuery(CATEGORY_QUERY, {
      variables: {
        id: record.id
      }
    });
    const category = data && data.category;
    return categoryLoading ? (
      <div align="center">
        <Spin size="small" />
      </div>
    ) : (
      <Table
        showHeader={false}
        tableLayout={'auto'}
        expandable={{
          expandedRowRender: (rowRecord: Category) => <ExpandedRowRender record={rowRecord} />,
          expandIcon: ({
            expanded,
            onExpand,
            record: rowRecord
          }: {
            expanded: boolean;
            onExpand: (record: Category, e) => void;
            record: Category;
          }) =>
            expanded ? (
              <Icon type="DownOutlined" onClick={e => onExpand(rowRecord, e)} />
            ) : (
              !rowRecord.isLeaf && <Icon type="RightOutlined" onClick={e => onExpand(rowRecord, e)} />
            )
        }}
        columns={columns}
        dataSource={category.subCategories}
      />
    );
  };

  const handlePageChange = (pagination: string, pageNumber: number) => {
    const {
      pageInfo: { endCursor }
    } = categories;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderCategory = () => (
    <Fragment>
      <Table
        dataSource={categories.edges.map(({ node }) => node)}
        columns={columns}
        tableLayout={'auto'}
        expandable={{
          expandedRowRender: (record: Category) => <ExpandedRowRender record={record} />,
          expandIcon: ({
            expanded,
            onExpand,
            record
          }: {
            expanded: boolean;
            onExpand: (record: Category, e) => void;
            record: Category;
          }) =>
            expanded ? (
              <Icon type="DownOutlined" onClick={e => onExpand(record, e)} />
            ) : (
              !record.isLeaf && <Icon type="RightOutlined" onClick={e => onExpand(record, e)} />
            )
        }}
      />
      <div align="center">
        <Pagination
          itemsPerPage={categories.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={categories.pageInfo.hasNextPage}
          pagination={type}
          total={categories.totalCount}
          loadMoreText={t('category.btn.more')}
          defaultPageSize={itemsNumber}
        />
      </div>
    </Fragment>
  );
  return (
    <div style={{ overflowY: 'auto', minHeight: '100vh', position: 'relative' }}>
      {/* Render loader */}
      {loading && (
        <RenderTableLoading
          columns={columns}
          tableProps={{
            scroll: { x: 1300 },
            expandable: {
              expandedRowRender: (record: Category) => <ExpandedRowRender record={record} />
            }
          }}
        />
      )}
      {/* Render main category content */}
      {categories && categories.totalCount ? (
        <RenderCategory />
      ) : (
        !loading && <EmptyComponent description={t('category.noCategoryMsg')} emptyLink={`${ROUTES.add}`} />
      )}
    </div>
  );
};

export default translate('category')(CategoryListComponent);
