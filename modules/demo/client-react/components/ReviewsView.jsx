import React, { useState } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { Button, Row, Col, Checkbox, Spin } from 'antd';

import PageLayout from './PageLayout';
import ReviewsItemComponent from './ReviewsItemComponent';
import WriteReviewComponent from './WriteReviewComponent';
import { PgTitle } from './StyledComponents';

import SuggestedListComponent from './SuggestedListComponent';
import AvgRatingComponent from './AvgRatingComponent';
import Pen from '../Icons/pen.svg';

const BtnDiv = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 120px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, #ffffff 77.6%);
  z-index: 1;
`;

const ReviewsView = props => {
  const { reviews, onSubmit, loading, ratings } = props;
  const [photo, setPhoto] = useState(false);
  const renderFunc = (key, review) => (
    <ReviewsItemComponent key={key} review={review} showPhotos={photo} onSubmit={onSubmit} />
  );
  const renderBtn = setVisible => (
    <Button type="primary" block onClick={setVisible}>
      <img alt="" src={Pen} style={{ paddingRight: '5px' }} /> Write a review
    </Button>
  );
  const RenderReviews = () => (
    <div>
      <SuggestedListComponent items={reviews} {...props} renderFunc={renderFunc} />
    </div>
  );
  return (
    <PageLayout showMenuBar={false} showNavBar={true} title={photo && 'Rating and reviews'}>
      <Row type="flex" align="middle">
        {!photo && (
          <>
            <Col span={24}>
              <PgTitle>{'Rating & Reviews'}</PgTitle>
            </Col>
            <Col span={24}>
              {ratings && (
                <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                  <AvgRatingComponent ratings={ratings} />
                </div>
              )}
            </Col>
          </>
        )}
        <Col span={24}>
          <Col span={12}>
            <h3>
              <strong>{`${reviews && reviews.totalCount} reviews`}</strong>
            </h3>
          </Col>
          <Col span={12}>
            <Row type="flex" justify="end" align="bottom">
              <Checkbox onChange={() => setPhoto(!photo)}>
                <strong>With photo</strong>
              </Checkbox>
            </Row>
          </Col>
        </Col>
        <Col span={24}>{reviews && reviews.totalCount ? <RenderReviews /> : !loading ? <Spin /> : null}</Col>
      </Row>
      <BtnDiv>
        <Col span={12} style={{ position: 'absolute', bottom: '10px', right: '17px' }}>
          <WriteReviewComponent onSubmit={onSubmit} renderBtn={renderBtn} type="ADD" />
        </Col>
      </BtnDiv>
    </PageLayout>
  );
};

ReviewsView.propTypes = {
  reviews: PropTypes.array,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default ReviewsView;
