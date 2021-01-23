/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { Divider, Card, Avatar } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import {
  // Icon,
  Select,
  Button,
  Option,
  Table,
  Pagination,
  // EditIcon,
  // DeleteIcon,
  // EmptyComponent,
  // Divider,
  // Avatar,
  RenderTableLoading,
  Spin
  // CardMeta,
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

const CardMeta = Card.Meta;
// import CATEGORY_QUERY from '../graphql/CategoryQuery.graphql';
// import ROUTES from '../routes';
// import { withCategory } from '../containers/CategoryOpertations';

const { itemsNumber, type } = settings.pagination.web;
export const displayDataCheck = (text, bool = false) => {
  if (bool) {
    return text ? 'True' : 'False';
  }
  return text ? text : 'Not-Provided';
};

const SubjectsListComponent = props => {
  const { onToggle, orderBy, onOrderBy, loading, subjects, t, loadData, deleteCategory /*, onDuplicate */ } = props;

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
        <a onClick={e => handleOrderBy(e, 'id')} href="#">
          {/* {t('category.column.id')} */}
          {'Id'}
          {renderOrderByArrow('id')}
        </a>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text /* , record */) => displayDataCheck(text)
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'title')} href="#">
          {t('category.column.listTitle')} {renderOrderByArrow('title')}
        </a>
      ),
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => displayDataCheck(text)
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'is_active')} href="#">
          {t('category.column.active')} {renderOrderByArrow('is_active')}
        </a>
      ),
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
      title: t('category.column.actions'),
      key: 'actions',
      render: (text, record) => (
        <div
        // align="center"
        >
          <a className="listing-link" href={`/question/subject/edit/${record.id}`}>
            edit
            {/* <EditIcon /> */}
          </a>
          {/* <a className="listing-link" href={`${ROUTES.editLink}${record.id}`}>
            <EditIcon />
          </a> */}
          <Divider type="vertical" />
          {/* <Tooltip title="Duplicate Listing">
            <Button color="primary" shape="circle" onClick={() => onDuplicate(record.id)}>
              <Icon type="CopyOutlined" />
            </Button>
          </Tooltip> */}
          {/* <Tooltip title="Duplicate Listing">
            <Button color="primary" shape="circle" onClick={() => onDuplicate(record.id)}>
              <Icon type="CopyOutlined" />
            </Button>
          </Tooltip> */}
          {/* <Divider type="vertical" /> */}
          <Button type="danger" onClick={() => deleteCategory(record.id)} title="Are you sure delete this listing?">
            delete
          </Button>
          {/* <DeleteIcon onClick={() => deleteCategory(record.id)} title="Are you sure delete this listing?" /> */}
        </div>
      )
    }
  ];

  const ExpandedRowRenderTopic = ({ record /* , index */ }) => {
    const { topics } = record;
    return <Table showHeader={false} tableLayout={'auto'} columns={columns} dataSource={topics} />;
    // return <h1>hello</h1>
  };
  const ExpandedRowRender = ({ record /* , index */ }) => {
    const { chapters } = record;
    return (
      <Table
        showHeader={false}
        tableLayout={'auto'}
        expandable={{
          expandedRowRender: (record, index, indent, expanded) => (
            <ExpandedRowRenderTopic record={record} index={index} indent={indent} expanded={expanded} />
          )
          // expandIcon: ({ expanded, onExpand, record }) =>
          //   expanded ? (
          //     <Icon type="DownOutlined" onClick={(e) => onExpand(record, e)} />
          //   ) : (
          //     !record.isLeaf && <Icon type="RightOutlined" onClick={(e) => onExpand(record, e)} />
          //   ),
        }}
        columns={columns}
        dataSource={chapters.subCategories}
      />
    );
    // return <h1>hello</h1>
  };

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = subjects;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderCategory = () => (
    <Fragment>
      <Table
        dataSource={subjects.edges.map(({ node }) => node)}
        columns={columns}
        tableLayout={'auto'}
        expandable={{
          expandedRowRender: (record, index, indent, expanded) => (
            <ExpandedRowRender record={record} index={index} indent={indent} expanded={expanded} />
          )
          // expandIcon: ({ expanded, onExpand, record }) =>
          //   expanded ? (
          //     <Icon type="DownOutlined" onClick={(e) => onExpand(record, e)} />
          //   ) : (
          //     !record.isLeaf && <Icon type="RightOutlined" onClick={(e) => onExpand(record, e)} />
          //   ),
        }}
        // loading={true}
      />
      <div align="center">
        <Pagination
          itemsPerPage={subjects.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={subjects.pageInfo.hasNextPage}
          pagination={type}
          total={subjects.totalCount}
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
              expandedRowRender: (record, index, indent, expanded) => (
                <ExpandedRowRender record={record} index={index} indent={indent} expanded={expanded} />
              )
            }
          }}
        />
      )}
      {/* Render main category content */}
      {subjects && subjects.totalCount ? (
        <RenderCategory />
      ) : (
        <h1>Empty</h1>
        // !loading && <EmptyComponent description={t('category.noCategoryMsg')} emptyLink={`${ROUTES.add}`} />
      )}
    </div>
  );
};

SubjectsListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadData: PropTypes.bool,
  subjects: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  t: PropTypes.func,
  onDuplicate: PropTypes.func,
  history: PropTypes.object,
  record: PropTypes.object,
  expanded: PropTypes.func,
  onExpand: PropTypes.func
};

export default translate('category')(SubjectsListComponent);
