import React from 'react';
import { PropTypes } from 'prop-types';
import { Rate, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Number = styled.div`
  position: absolute;
  left: 20px;
  top: 8px;
  font-size: 13px;
  line-height: 8px;
  color: #9b9b9b;
`;

const Details = styled.p`
  font-size: 10px;
  line-height: 12px;
  margin-top: 5px;
  color: #9b9b9b;
`;

const UserDisplayDetailComponent = props => {
  const { user } = props;
  console.log(props);
  return (
    user && (
      <Link className="listing-link" to={`/demo/baker/${user.id}`}>
        <Card
          style={{
            marginBottom: '24px',
            // height: '100px',
            borderWidth: '0px'
          }}
          hoverable
          bodyStyle={{
            padding: '0px'
          }}
        >
          <Row justify="space-around" type="flex" align="middle">
            <Col span={6} align="center" style={{ width: '100px', overflow: 'hidden' }}>
              <img
                alt=""
                src={user.profile && user.profile.imageUrl}
                height="100px"
                width="100px"
                style={{ borderRadius: '50%' }}
              />
            </Col>
            <Col span={15}>
              <h3>
                <span color="#6c6b6b">
                  <strong>{user.profile && user.profile.fullName}</strong>
                </span>
              </h3>
              <Row>
                {user &&
                  user.menu &&
                  user.menu.length !== 0 &&
                  user.menu.map(item => {
                    return (
                      <Col span={24 / (user && user.menu && user.menu.length)}>
                        <Details>{item} . </Details>
                      </Col>
                    );
                  })}
              </Row>
              <Row justify="space-around">
                <Col span={4}>
                  <Rate
                    style={{
                      fontSize: '15px'
                    }}
                    count={1}
                    disabled
                    defaultValue={user.profile && user.profile.ratting}
                  />
                  <Number>{user.profile && user.profile.rating}</Number>
                </Col>
                <Col span={4}>
                  <Number>{user.profile && user.profile.distance}km</Number>
                </Col>
                <Col span={4}>
                  <Number>Avg.Price</Number>
                </Col>
                <Col span={4} />
              </Row>
            </Col>
          </Row>
        </Card>
      </Link>
    )
  );
};

UserDisplayDetailComponent.propTypes = {
  user: PropTypes.object
};

export default UserDisplayDetailComponent;
