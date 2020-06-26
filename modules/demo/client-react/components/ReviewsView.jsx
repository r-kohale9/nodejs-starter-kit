import React, { useState } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { Row, Col, Checkbox, Button } from 'antd';

import PageLayout from './PageLayout';
import ReviewsItemComponent from './ReviewsItemComponent';
import WriteReviewComponent from './WriteReviewComponent';

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
  const { reviews } = props;
  const [photo, setPhoto] = useState(false);
  return (
    <PageLayout showMenuBar={false} showNavBar={true} title={photo && 'Rating and reviews'}>
      <Row type="flex" align="middle">
        {!photo && (
          <Col span={24}>
            <h1>{'Rating & Reviews'}</h1>
          </Col>
        )}
        <Col span={24}>
          <Col span={12}>
            <h1>{`${reviews && reviews.length} reviews`}</h1>
          </Col>
          <Col span={12}>
            <Row type="flex" justify="end" align="bottom">
              <Checkbox onChange={() => setPhoto(!photo)}>With photo</Checkbox>
            </Row>
          </Col>
        </Col>
        <Col span={24}>
          {reviews &&
            reviews.map(review => (
              <Col span={24}>
                <ReviewsItemComponent review={review} showPhotos={photo} />
              </Col>
            ))}
        </Col>
      </Row>
      <BtnDiv>
        <Col span={12} style={{ position: 'absolute', bottom: '10px', right: '17px' }}>
          <WriteReviewComponent />
        </Col>
      </BtnDiv>
    </PageLayout>
  );
};

ReviewsView.propTypes = {
  reviews: PropTypes.array
};

export default ReviewsView;
