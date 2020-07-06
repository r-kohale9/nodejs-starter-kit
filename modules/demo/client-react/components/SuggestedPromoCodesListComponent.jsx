import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Spin, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import PromoCardComponent from './PromoCardComponent';

class SuggestedCardListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.getPromoCodes,
      loading: false,
      hasMore: true
    };
  }
  componentDidMount = () => {
    const getPromoCodes = !this.props.loading && this.props.getPromoCodes;
    !this.props.loading &&
      this.setState({
        hasMore: getPromoCodes.pageInfo.hasNextPage,
        loading: false,
        data: getPromoCodes
      });
  };

  async fetchMoreData() {
    this.setState({ loading: true });
    const hasMore = this.props.getPromoCodes.pageInfo.hasNextPage;
    const endCursor = this.props.getPromoCodes.pageInfo.endCursor;

    if (!hasMore) {
      console.log('end reached');
      this.setState({ hasMore: false });

      return;
    } else {
      const newData = await this.props.loadData(endCursor + 1, 'add');
      console.log('newData', newData);
      this.setState({
        data: [...this.state.data.edges, ...newData.data.getPromoCodes.edges],
        loading: false
      });
    }
  }

  render() {
    console.log('in', this.state);
    return (
      <InfiniteScroll
        style={{ overflow: 'none' }}
        dataLength={this.props.getPromoCodes.totalCount}
        next={this.fetchMoreData.bind(this)}
        hasMore={this.state.hasMore}
        loader={
          <div align="center">
            <Spin />
          </div>
        }
        endMessage={
          <Divider>
            <p style={{ textAlign: 'center', marginTop: '25px' }}>
              <b>End Of Promo Codes</b>
            </p>
          </Divider>
        }
      >
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4
          }}
          dataSource={this.state.data && this.state.data.edges}
          renderItem={item => (
            <List.Item key={item.node.id}>
              <PromoCardComponent promocode={item.node} onApply={this.props.onSubmit} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    );
  }
}

SuggestedCardListComponent.propTypes = {
  getPromoCodes: PropTypes.array,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  history: PropTypes.object,
  loadData: PropTypes.func
};

export default SuggestedCardListComponent;
