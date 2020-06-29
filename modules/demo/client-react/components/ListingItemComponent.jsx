import React from 'react';
import { Rate, Button, Row, Col, Card } from 'antd';
import { compose } from '@gqlapp/core-common';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { withCurrentUser, withToogleListingBookmark } from '@gqlapp/listing-client-react/containers/ListingOperations';

import BookmarkComponent from './BookmarkComponent';

import Bag from '../Icons/shoppingbag.svg';

const Number = styled.div`
  font-size: 10px;
  padding-left: 5px;
  color: #9b9b9b;
`;

const ShoppingBag = styled(Button)`
  width: 30px;
  height: 30px;
  z-index: 1;

  background: #fc4c4c;
  box-sizing: border-box;
  border-radius: 9px;
`;

const ListingItemComponent = props => {
  const { loading, listing, currentUser } = props;

  const bookmarkListing = async (id, userId) => {
    try {
      console.log('id', id, 'userId', userId);
      await props.addOrRemoveListingBookmark(id, userId);
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    !loading && (
      <>
        <Row type="flex" justify="center" style={{ width: '164px', position: 'absolute', top: '114px' }}>
          <Col span={12} />
          <Col span={6}>
            <Row type="flex" justify="end">
              {currentUser && (
                <BookmarkComponent
                  handleBookmark={() => bookmarkListing(listing.id, currentUser.id)}
                  listing={listing}
                  currentUser={currentUser}
                />
              )}
            </Row>
          </Col>
          <Col span={6}>
            <Row type="flex" justify="end">
              <Link
                to={{
                  pathname: `/demo/listing-detail/${listing.id}`,
                  preOrder: true // your data array of objects
                }}
              >
                <ShoppingBag>
                  <img
                    alt=""
                    src={Bag}
                    style={{
                      position: 'absolute',
                      left: '7px',
                      top: '6px',
                      height: '15px',
                      width: '15px'
                    }}
                  />
                </ShoppingBag>
              </Link>
            </Row>
          </Col>
        </Row>
        <Link
          className="listing-link"
          to={{
            pathname: `/demo/listing-detail/${listing.id}`,
            preOrder: false // your data array of objects
          }}
        >
          <Card
            style={{
              marginBottom: '24px',
              width: '164px',
              height: '260px',
              borderWidth: '0px',
              borderRadius: '8px'
            }}
            hoverable
            bodyStyle={{
              padding: '0px'
            }}
            cover={
              <div style={{ height: '130px', overflow: 'hidden' }}>
                <img alt="example" src={listing.listingImages[0].imageUrl} />
              </div>
            }
          >
            <div style={{ margin: '20px 0px 0px 0px', display: 'flex' }}>
              <Rate
                style={{
                  fontSize: '10px'
                }}
                disabled
                defaultValue={listing.rating}
              />
              <Number>{`(${listing.rating})`}</Number>
            </div>
            <small>{listing.description}</small>
            <h3>
              <strong>{listing.title}</strong>
            </h3>
            <h3>
              <strong>Rs.{listing.listingCost.cost}</strong>
            </h3>
          </Card>
        </Link>
      </>
    )
  );
};

ListingItemComponent.propTypes = {
  listing: PropTypes.object,
  currentUser: PropTypes.object,
  deleteProduct: PropTypes.func,
  addOrRemoveListingBookmark: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool
};

export default compose(withCurrentUser, withToogleListingBookmark, translate('demo'))(ListingItemComponent);
