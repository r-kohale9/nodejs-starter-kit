import React from 'react';
import { Row, Col, Button } from 'antd';
import Slider from 'react-slick';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const Rectangle = styled(Button)`
  background: #222222;
  border-radius: 29px;
`;

const Text = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  display: flex;
  align-items: center;
  text-align: center;

  /* White */

  color: #ffffff;
`;

const OrderStatusSlick = props => {
  const { data } = props;
  const settings = {
    infinite: true,
    speed: 500,
    variableWidth: true,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div style={{ marginTop: '24px', marginBottom: '30px' }}>
      {console.log('data', data)}
      <Slider {...settings}>
        {data &&
          data.map(status => {
            return (
              <Row align="middle" type="flex" justify="space-around">
                {console.log('status', status)}
                <Col span={24}>
                  <Rectangle>
                    <Text>{status}</Text>
                  </Rectangle>
                </Col>
              </Row>
            );
          })}
      </Slider>
    </div>
  );
};

OrderStatusSlick.propTypes = {
  data: PropTypes.array
};

export default OrderStatusSlick;
