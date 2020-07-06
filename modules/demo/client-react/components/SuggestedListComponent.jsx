// import React, { Component, useState } from 'react';
// import PropTypes from 'prop-types';
// import { List, Spin, Divider } from 'antd';
// import InfiniteScroll from 'react-infinite-scroll-component';

// const SuggestedListComponent = props => {
//   const { reviews, loadData, showPhotos } = props;
//   const [data, setData] = useState(reviews);
//   const [load, setLoad] = useState(false);
//   const [hasMore, setHasMore] = useState(reviews.pageInfo.hasNextPage);

//   const fetchMoreData = async () => {
//     setLoad(true);
//     const endCursor = data && data.pageInfo.endCursor;
//     console.log('endCursor', endCursor);
//     console.log('hasMore', hasMore);

//     if (!hasMore) {
//       console.log('end reached');
//       setHasMore(false);

//       return;
//     } else {
//       const newData = await loadData(endCursor + 1, 'add');
//       console.log('newData', newData);
//       setData(newData.reviews);
//       setLoad(false);
//     }
//   };
//   console.log('data', data);
//   return (
//     <InfiniteScroll
//       style={{ overflow: 'none' }}
//       dataLength={data.totalCount}
//       next={fetchMoreData}
//       hasMore={hasMore}
//       loader={
//         <div align="center">
//           <Spin />
//         </div>
//       }
//       endMessage={
//         <Divider>
//           <p style={{ textAlign: 'center', marginTop: '25px' }}>
//             <b>End Of Listings</b>
//           </p>
//         </Divider>
//       }
//     >
//       <List
//         grid={{
//           gutter: 24,
//           xs: 1,
//           sm: 2,
//           md: 2,
//           lg: 3,
//           xl: 4,
//           xxl: 4
//         }}
//         dataSource={data.edges}
//         renderItem={item => (
//           <List.Item key={item.node.id}>
//             <ReviewsItemComponent key={item.node.id} review={item.node} showPhotos={showPhotos} />
//           </List.Item>
//         )}
//       />
//     </InfiniteScroll>
//   );
// };

// SuggestedListComponent.propTypes = {
//   reviews: PropTypes.array,
//   loading: PropTypes.bool,
//   currentUser: PropTypes.object,
//   history: PropTypes.object,
//   loadData: PropTypes.func
// };

// export default SuggestedListComponent;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Spin, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReviewsItemComponent from './ReviewsItemComponent';

class SuggestedCardListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.listings,
      loading: false,
      hasMore: true
    };
  }
  componentDidMount = () => {
    const listings = !this.props.loading && this.props.listings;
    !this.props.loading &&
      this.setState({
        hasMore: listings.pageInfo.hasNextPage,
        loading: false,
        data: listings
      });
  };

  async fetchMoreData() {
    this.setState({ loading: true });
    const hasMore = this.props.listings.pageInfo.hasNextPage;
    const endCursor = this.props.listings.pageInfo.endCursor;

    if (!hasMore) {
      console.log('end reached');
      this.setState({ hasMore: false });

      return;
    } else {
      const newData = await this.props.loadData(endCursor + 1, 'add');
      console.log('newData', newData);
      this.setState({
        data: newData.listings,
        loading: false
      });
    }
  }

  render() {
    console.log('in', this.state);
    return (
      <InfiniteScroll
        style={{ overflow: 'none' }}
        dataLength={this.props.listings.totalCount}
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
              <b>End Of Listings</b>
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
          dataSource={this.state.data.edges}
          renderItem={item => (
            <List.Item key={item.node.id}>
              <ReviewsItemComponent key={item.node.id} review={item.node} showPhotos={this.props.showPhotos} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    );
  }
}

SuggestedCardListComponent.propTypes = {
  listings: PropTypes.array,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  history: PropTypes.object,
  loadData: PropTypes.func
};

export default SuggestedCardListComponent;
