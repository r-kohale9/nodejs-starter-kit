import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Row, Col, Icon, Card, Rate, Menu } from 'antd';
import { PropTypes } from 'prop-types';
import DropDown from '@gqlapp/look-client-react/ui-antd/components/Dropdown';

import WriteReviewComponent from './WriteReviewComponent';
import ImagesSlickComponent from './ImagesSlickComponent';
import { Text, DropDownButton } from './StyledComponents';

const Avatar = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 8px;
  z-index: 1;
`;

const ReviewsItemComponent = props => {
  const { review, showPhotos, onSubmit } = props;
  // console.log('props', props);
  return (
    <Row type="flex" align="middle">
      <Avatar alt="" src={review.user.profile.imageUrl} />
      <Card
        style={{
          margin: '28px 0px 0px 16px',
          borderWidth: '0px',
          borderRadius: '8px'
        }}
      >
        <Row>
          <Col span={21}>
            <h3>
              <strong>{review.user.profile.fullName}</strong>
            </h3>
          </Col>
          <Col span={2}>
            <Row type="flex" justify="end">
              <DropDown type="more">
                <Menu.Item key="0">
                  <WriteReviewComponent
                    type="EDIT"
                    onSubmit={onSubmit}
                    review={review}
                    renderBtn={func => (
                      <DropDownButton block type="link" onClick={func}>
                        Edit
                      </DropDownButton>
                    )}
                  />
                </Menu.Item>
                <Menu.Item key="1">
                  <DropDownButton block type="link" onClick={() => onSubmit(review.id, 'DELETE')}>
                    Delete
                  </DropDownButton>
                </Menu.Item>
              </DropDown>
            </Row>
          </Col>
        </Row>
        <Col span={12}>
          <Rate disabled defaultValue={review.rating} style={{ fontSize: '15px' }} />
          <div style={{ margin: '10px 0px' }} />
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end" align="middle">
            <Text>{moment(`${review.createdAt}`).format('LL')}</Text>
          </Row>
        </Col>
        <Col span={24}>
          <p>{review.feedback}</p>
        </Col>
        {showPhotos && (
          <Col span={24}>
            <ImagesSlickComponent images={review.reviewImages} />
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
