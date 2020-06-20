import React, { useState } from 'react';
import { Card, Row, Col, Button, Menu } from 'antd';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import DropDown from '@gqlapp/look-client-react/ui-antd/components/Dropdown';

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
  const [units, setUnits] = useState(item.units);
  return (
    <Card
      style={{
        marginBottom: '24px',
        // width: '164px',
        height: '104px',
        borderWidth: '0px',
        borderRadius: '8px'
      }}
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
          <Row>
            <Row>
              <Col span={20}>
                <Title>{item.title}</Title>
              </Col>
              <Col span={4}>
                <Row type="flex" justify="end">
                  <DropDown type="more">
                    <Menu.Item key="0">
                      <Button type="link">Add to favorites</Button>
                    </Menu.Item>
                    <Menu.Item key="1">
                      <Button type="link">Delete from the list</Button>
                    </Menu.Item>
                  </DropDown>
                </Row>
              </Col>
            </Row>
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
            <Row type="flex" align="middle" style={{ paddingTop: '15px' }}>
              <Col span={12}>
                <Row type="flex" justify="space-between">
                  <Col span={8}>
                    <Button shape="circle" icon="minus" onClick={() => setUnits(units - 1)} />
                  </Col>
                  <Col span={8}>
                    <div
                      style={{
                        textAlign: 'center',
                        height: '100%',
                        lineHeight: '32px'
                      }}
                    >
                      {units}
                    </div>
                  </Col>
                  <Col span={8}>
                    <Button shape="circle" icon="plus" onClick={() => setUnits(units + 1)} />
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="end">
                  Rs. {item.price}
                </Row>
              </Col>
            </Row>
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
