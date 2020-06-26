import React from 'react';
import { PropTypes } from 'prop-types';
import { Rate, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Write from '../Icons/write.svg';
import Contact from '../Icons/contact.svg';

const Name = styled.div`
  font-family: Quicksand;
  font-weight: bold;
  font-size: 16px;
  /* line-height: 20px; */

  color: #fc4c4c;
`;

const Number = styled.div`
  font-family: Quicksand;
  font-size: 8px;
  line-height: 20px;
  color: #9b9b9b;
`;

const Details = styled.p`
  font-family: Quicksand;
  font-size: 8px;
  line-height: 10px;

  color: #9b9b9b;
`;

const UserDisplayDetailComponent = props => {
  const { user, history } = props;
  return (
    <Row>
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
        <img alt="" src={user.thumbnail} width="93px" />
      </Col>
      <Col span={15} style={{ margin: '0 0 0 17px' }}>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={18}>
            <Name>{user.name}</Name>
          </Col>
          <Col span={2}>
            <img alt="" src={Write} onClick={() => history.push('/demo/reviews')} />
          </Col>
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

export default UserDisplayDetailComponent;
