import React from 'react';
import { Card, Row, Col } from 'antd';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const Title = styled.div`
  font-family: Metropolis;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height */

  /* Black */

  color: #222222;
`;

const Text = styled.div`
  font-family: Metropolis;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  padding-right: 5px;
  /* line-height: 11px; */
  /* identical to box height */

  /* letter-spacing: -0.0015em; */

  /* Gray */

  color: ${props => (props.color ? props.color : '#9b9b9b')};
`;

const CartItemComponent = props => {
  const { item } = props;
  return (
    <Card
      style={{
        marginBottom: '24px',
        // width: '164px',
        height: '104px',
        borderWidth: '0px',
        borderRadius: '8px'
      }}
      hoverable
      bodyStyle={{
        padding: '0px'
      }}
    >
      <Row>
        <Col span={8}>
          <div style={{ height: '104px', overflow: 'hidden' }}>
            <img alt="example" src={item.imageUrl} />
          </div>
        </Col>
        <Col span={16} style={{ padding: '11px' }}>
          <Row gutter={[0, 6]}>
            <Col span={24}>
              <Title>{item.title}</Title>
            </Col>
            <Col span={24}>
              <Text>{item.category}</Text>
            </Col>
            <Row>
              <Col span={16}>
                <p style={{ display: 'flex' }}>
                  <Text>Flavour:</Text> <Text color="black">{item.flavour}</Text>
                </p>
              </Col>
              <Col span={8}>
                <p style={{ display: 'flex' }}>
                  <Text>Weight:</Text>
                  <Text color="black">{item.weight}</Text>
                </p>
              </Col>
            </Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Row type="flex" justify="start">
                    <p style={{ display: 'flex' }}>
                      <Text>Units:</Text> {item.unit}
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

CartItemComponent.propTypes = {
  item: PropTypes.object
};

export default CartItemComponent;
