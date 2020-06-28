import React from 'react';
import { Card, Row, Col } from 'antd';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import { Text } from './StyledComponents';

const TextGrey = styled(Text)`
  font-size: 12px;
  line-height: 20px;
  padding-right: 5px;
`;

const OrderDetailsItemComponent = props => {
  const { item } = props;
  return (
    <Card
      style={{
        background: '#FFFFFF',
        boxShadow: '0px 1px 25px rgba(0, 0, 0, 0.08)',
        borderRadius: '8px',
        marginBottom: '24px',
        borderWidth: '0px'
      }}
      hoverable
      bodyStyle={{
        padding: '0px'
      }}
    >
      <Row type="flex" justify="" align="middle">
        <Col span={8}>
          <div style={{ height: '104px', overflow: 'hidden' }}>
            <img alt="example" src={item.imageUrl} />
          </div>
        </Col>
        <Col span={16} style={{ padding: '11px' }}>
          <Row>
            <Col span={24}>
              <h3>
                <strong>{item.title}</strong>
              </h3>
            </Col>
            <Col span={24}>
              <TextGrey>{item.category}</TextGrey>
            </Col>
            <Row>
              <Col span={16}>
                <p style={{ display: 'flex' }}>
                  <TextGrey>Flavour:</TextGrey> <strong>{item.flavour}</strong>
                </p>
              </Col>
              <Col span={8}>
                <p style={{ display: 'flex' }}>
                  <TextGrey>Weight:</TextGrey>
                  <strong>{item.weight}</strong>
                </p>
              </Col>
            </Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Row type="flex" justify="start">
                    <p style={{ display: 'flex' }}>
                      <TextGrey>Units:</TextGrey>
                      <strong>{item.units}</strong>
                    </p>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row type="flex" justify="end">
                    Rs. {item.price}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

OrderDetailsItemComponent.propTypes = {
  item: PropTypes.object
};

export default OrderDetailsItemComponent;
