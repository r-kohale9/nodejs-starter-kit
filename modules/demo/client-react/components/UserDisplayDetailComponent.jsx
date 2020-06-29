import React from 'react';
import { PropTypes } from 'prop-types';
import { Rate, Row, Col } from 'antd';
import styled from 'styled-components';

import Write from '../Icons/write.svg';
import Contact from '../Icons/contact.svg';

const Name = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #fc4c4c;
`;

const Number = styled.div`
  font-size: 10px;
  line-height: 23px;
  color: #6c6b6b;
`;

const Details = styled.p`
  font-size: 10px;
  line-height: 12px;

  color: #6c6b6b;
`;

const UserDisplayDetailComponent = props => {
  const { user, history } = props;
  return (
    <Row type="flex" align="middle" justify="center">
      <Col
        span={6}
        align="center"
        style={{
          width: '93px',
          height: 'auto',
          overflow: 'hidden',
          borderRadius: '12px'
        }}
      >
        <img alt="" src={user.thumbnail} style={{ borderRadius: '8px' }} width="93px" />
      </Col>
      <Col span={15} style={{ margin: '0 0 0 17px' }}>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={17}>
            <Name>{user.name}</Name>
          </Col>
          <Col span={2}>
            <img alt="" src={Write} onClick={() => history.push('/demo/reviews')} />
          </Col>
          <Col span={3} />
          <Col span={2}>
            <img alt="" src={Contact} onClick={() => history.push('/demo/contact')} />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Rate
              style={{
                fontSize: '15px'
              }}
              count={1}
              disabled
              defaultValue={user.rating}
            />
            <Number>{user.rating}</Number>
          </Col>
          <Col span={4}>
            <Number>{user.distance}km</Number>
          </Col>
        </Row>
        <Details>{user.details}</Details>
      </Col>
    </Row>
  );
};

UserDisplayDetailComponent.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object
};

export default UserDisplayDetailComponent;
