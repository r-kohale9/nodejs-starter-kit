import React from 'react';
import Table from 'antd/lib/table';
import PropTypes from 'prop-types';
import { TweenOneGroup } from 'rc-tween-one';

import settings from '@gqlapp/config';

import '../styles/tableMotion.less';
import Row from './Row';
import Col from './Col';
import Pagination from './Pagination';

const { itemsNumber, type } = settings.pagination.web;

const TableContext = React.createContext(false);

class TableMotion extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: 'table-enter-leave-demo'
  };

  constructor(props) {
    super(props);
    this.enterAnim = [
      {
        opacity: 0,
        x: 30,
        backgroundColor: '#fffeee',
        duration: 0
      },
      {
        height: 0,
        duration: 200,
        type: 'from',
        delay: 250,
        ease: 'easeOutQuad',
        onComplete: this.onEnd
      },
      {
        opacity: 1,
        x: 0,
        duration: 250,
        ease: 'easeOutQuad'
      },
      { delay: 1000, backgroundColor: '#fff' }
    ];
    this.pageEnterAnim = [
      {
        opacity: 0,
        duration: 0
      },
      {
        height: 0,
        duration: 150,
        type: 'from',
        delay: 150,
        ease: 'easeOutQuad',
        onComplete: this.onEnd
      },
      {
        opacity: 1,
        duration: 150,
        ease: 'easeOutQuad'
      }
    ];
    this.leaveAnim = [
      { duration: 250, opacity: 0 },
      { height: 0, duration: 200, ease: 'easeOutQuad' }
    ];
    this.pageLeaveAnim = [
      { duration: 150, opacity: 0 },
      { height: 0, duration: 150, ease: 'easeOutQuad' }
    ];

    // 动画标签，页面切换时改用 context 传递参数；
    this.animTag = $props => {
      return (
        <TableContext.Consumer>
          {isPageTween => {
            return (
              <TweenOneGroup
                component="tbody"
                enter={!isPageTween ? this.enterAnim : this.pageEnterAnim}
                leave={!isPageTween ? this.leaveAnim : this.pageLeaveAnim}
                appear={false}
                exclusive
                {...$props}
              />
            );
          }}
        </TableContext.Consumer>
      );
    };

    this.state = {
      isPageTween: false
    };
  }

  onEnd = e => {
    const dom = e.target;
    dom.style.height = 'auto';
  };

  onAdd = () => {
    this.props.onAdd();
    this.setState({
      isPageTween: false
    });
  };

  onDelete = (key, e) => {
    e.preventDefault();
    this.setState({ isPageTween: false });
  };

  pageChange = () => {
    this.setState({
      isPageTween: true
    });
  };
  render() {
    const handlePageChange = (pagination, pageNumber) => {
      const {
        pageInfo: { endCursor }
      } = this.props.dataSource;
      pagination === 'relay'
        ? this.props.loadData(endCursor + 1, 'add')
        : this.props.loadData((pageNumber - 1) * itemsNumber, 'replace');
      this.setState({
        isPageTween: true
      });
    };
    return (
      <div>
        <Row>
          <Col lg={22} md={20} xs={24}>
            {/* <Heading type="2"> */}
            {/* <Icon type="SolutionOutlined" />
            &nbsp;
            {t('list.subTitle')} */}
            {this.props.heading}
            {/* </Heading> */}
          </Col>
          <Col lg={0} md={0} xs={24}>
            <br />
          </Col>
          <Col lg={2} md={4} xs={24} align="right">
            {/* <Link to={ROUTES.add}> */}
            {/* <AddButton>{t('list.btn.add')}</AddButton> */}
            {/* </Link> */}
            {this.props.addButton}
          </Col>
        </Row>
        <hr />
        {this.props.filterComponent}
        <hr />
        <TableContext.Provider value={this.state.isPageTween}>
          <Table
            columns={this.props.columns}
            pagination={false}
            rowKey="id"
            // pagination={{ pageSize: 10 }}
            dataSource={this.props.dataSource && this.props.dataSource.edges.map(({ node }) => node)}
            // className={`${this.props.className}-table`}
            components={{ body: { wrapper: this.animTag } }}
            onChange={this.pageChange}
            scroll={this.props.scroll}
          />
        </TableContext.Provider>
        <div align="center">
          <Pagination
            itemsPerPage={this.props.dataSource && this.props.dataSource.edges.length}
            handlePageChange={handlePageChange}
            hasNextPage={this.props.dataSource && this.props.dataSource.pageInfo.hasNextPage}
            pagination={type}
            total={this.props.dataSource && this.props.dataSource.totalCount}
            loadMoreText={this.props.loadMoreText}
            defaultPageSize={itemsNumber}
          />
        </div>
      </div>
    );
  }
}
TableMotion.propTypes = {
  onAdd: PropTypes.func,
  heading: PropTypes.node,
  addButton: PropTypes.node,
  filterComponent: PropTypes.node,
  columns: PropTypes.node,
  scroll: PropTypes.node,
  dataSource: PropTypes.node,
  loadMoreText: PropTypes.string,
  loadData: PropTypes.func
};

export default TableMotion;
