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
  const { listing } = item && item;
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
      {console.log('props', props)}
      <Row type="flex" justify="" align="middle">
        <Col span={8}>
          <div style={{ height: '104px', overflow: 'hidden' }}>
            <img alt="example" src={listing.listingImages[0].imageUrl} />
          </div>
        </Col>
        <Col span={16} style={{ padding: '11px' }}>
          <Row>
            <Col span={24}>
              <h3>
                <strong>{listing.title}</strong>
              </h3>
            </Col>
            <Col span={24}>
              <TextGrey>{listing.category}</TextGrey>
            </Col>
            <Row>
              <Col span={14}>
                <p style={{ display: 'flex' }}>
                  <TextGrey>Flavour:</TextGrey> <strong>{listing.flavour}</strong>
                </p>
              </Col>
              <Col span={10}>
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
                      <strong>{item.unit}</strong>
                    </p>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row type="flex" justify="end">
                    Rs. {listing.listingCost.cost}
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
