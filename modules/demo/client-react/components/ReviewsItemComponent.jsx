import React from 'react';
import styled from 'styled-components';
import { Row, Col, Icon, Card, Rate } from 'antd';
import { PropTypes } from 'prop-types';

import ImagesSlickComponent from './ImagesSlickComponent';
import { Text } from './StyledComponents';

const Avatar = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 8px;
  z-index: 1;
`;

const ReviewsItemComponent = props => {
  const { review, showPhotos } = props;
  return (
    <Row type="flex" align="middle">
      <Avatar alt="" src={review.thumbnail} />
      <Card
        style={{
          margin: '28px 0px 0px 16px',
          borderWidth: '0px',
          borderRadius: '8px'
        }}
      >
        <Col span={24}>
          <h3>
            <strong>{review.name}</strong>
          </h3>
        </Col>
        <Col span={12}>
          <Rate disabled defaultValue={review.rating} style={{ fontSize: '15px' }} />
          <div style={{ margin: '10px 0px' }} />
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end" align="middle">
            <Text>{review.date}</Text>
          </Row>
        </Col>
        <Col span={24}>
          <p>{review.review}</p>
        </Col>
        {showPhotos && (
          <Col span={24}>
            <ImagesSlickComponent images={review.images} />
          </Col>
        )}
        <Col span={24}>
          <Row type="flex" justify="end" align="middle">
            <Text>
              Helpful
              <Icon
                type="like"
                theme="filled"
                style={{
                  paddingLeft: '4px'
                }}
              />
            </Text>
          </Row>
        </Col>
      </Card>
    </Row>
  );
};

ReviewsItemComponent.propTypes = {
  review: PropTypes.object,
  showPhotos: PropTypes.bool
};

export default ReviewsItemComponent;
