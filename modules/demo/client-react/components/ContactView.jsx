import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { Row, Col, Rate } from 'antd';

import PageLayout from './PageLayout';
import Location from '../Icons/location.svg';
import Mail from '../Icons/mail.svg';
import Phone from '../Icons/phone.svg';
import Whatsapp from '../Icons/whatsapp.svg';

const Name = styled.div`
  font-family: Quicksand;
  font-weight: bold;
  font-size: 16px;

  color: #fc4c4c;
`;
const Number = styled.div`
  font-family: Quicksand;
  font-size: 15px;
  color: #9b9b9b;
`;

const Details = styled.div`
  background: #ffffff;
  box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  height: 400px;
  width: 100%;
  padding: 10px 7px 0 7px;
`;

const ContactView = props => {
  const { user, history, address } = props;
  return (
    <PageLayout history={history} title="Contact" showMenuBar={true} mobNavBar={true}>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={24} style={{ borderRadius: '12px' }}>
          <Row type="flex" justify="center">
            <img alt="" src={user.thumbnail} style={{ borderRadius: '12px' }} />
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" justify="center">
            <Name>{user.name}</Name>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" justify="center">
            <Col span={2}>
              <Rate
                style={{
                  fontSize: '15px'
                }}
                count={1}
                disabled
                defaultValue={user.rating}
              />
            </Col>
            <Col span={2}>
              <Number>{user.rating}</Number>
            </Col>
            <Col span={3}>
              <Number>{user.distance}km</Number>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div style={{ margin: '30px 0', width: '100%' }} />
        </Col>
        <Details>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Col span={3}>
                <Row type="flex" justify="center" align="middle">
                  <img alt="" src={Location} />
                </Row>
              </Col>
              <Col span={1} />
              <Col span={20}>
                <p>{`${address.address}, ${address.city}, ${address.state}, ${address.pinCode}`}</p>
              </Col>
            </Col>
            <Col span={24}>
              <Col span={3}>
                <Row type="flex" justify="center" align="middle">
                  <img alt="" src={Mail} />
                </Row>
              </Col>
              <Col span={1} />
              <Col span={20}>{user.mail}</Col>
            </Col>
            <Col span={24}>
              <Col span={3}>
                <Row type="flex" justify="center" align="middle">
                  <img alt="" src={Phone} />
                </Row>
              </Col>
              <Col span={1} />
              <Col span={20}>{user.phone}</Col>
            </Col>
            <Col span={24}>
              <Col span={3}>
                <Row type="flex" justify="center" align="middle">
                  <img alt="" src={Whatsapp} />
                </Row>
              </Col>
              <Col span={1} />
              <Col span={20}>{user.watsapp}</Col>
            </Col>
          </Row>
        </Details>
      </Row>
    </PageLayout>
  );
};

ContactView.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  address: PropTypes.object
};

export default ContactView;
