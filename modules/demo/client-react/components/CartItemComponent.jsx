import React, { useState } from 'react';
import { Card, Row, Col, Button, Menu } from 'antd';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import DropDown from '@gqlapp/look-client-react/ui-antd/components/Dropdown';

import { DropDownButton } from './StyledComponents';

const Text = styled.div`
  font-family: Metropolis, QuickSand;
  font-size: 12px;
  line-height: 1.75;
  padding-right: 5px;
  color: '#9b9b9b';
`;

const IncremntBtn = styled(Button)`
  border: 0px;
  color: #9b9b9b;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartItemComponent = props => {
  const { name, item, onChange, onDelete } = props;
  const listing = item.listing;
  const [units, setUnits] = useState(item.unit);
  const handleChange = value => {
    setUnits(value);
    onChange(name, value);
  };

  return (
    <Card
      style={{
        background: '#FFFFFF',
        boxShadow: '0px 1px 24px rgba(0, 0, 0, 0.12)',
        marginBottom: '24px',
        borderWidth: '0px',
        borderRadius: '8px'
      }}
      bodyStyle={{
        padding: '0px'
      }}
    >
      <Row>
        <Col span={8}>
          <Row type="flex" justify="center" align="middle">
            <div style={{ overflow: 'hidden' }}>
              <img alt="example" src={listing.listingImages[0].imageUrl} />
            </div>
          </Row>
        </Col>
        <Col span={16} style={{ padding: '11px' }}>
          <Row>
            <Row>
              <Col span={20}>
                <h3>
                  <strong>{listing.title}</strong>
                </h3>
              </Col>
              <Col span={4}>
                <Row type="flex" justify="end">
                  <DropDown type="more">
                    <Menu.Item key="0">
                      <DropDownButton block type="link">
                        Add to favorites
                      </DropDownButton>
                    </Menu.Item>
                    <Menu.Item key="1">
                      <DropDownButton block type="link" onClick={() => onDelete(item.id)}>
                        Delete from the list
                      </DropDownButton>
                    </Menu.Item>
                  </DropDown>
                </Row>
              </Col>
            </Row>
            <Col span={24}>
              <Text>{listing.category}</Text>
            </Col>
            <Row>
              <Col span={16}>
                <p style={{ display: 'flex' }}>
                  <Text>Flavour:</Text> <strong>{listing.flavour}</strong>
                </p>
              </Col>
              <Col span={8}>
                <p style={{ display: 'flex' }}>
                  <Text>Weight:</Text>
                  <strong>{item.weight}</strong>
                </p>
              </Col>
            </Row>
            <Row type="flex" align="middle" style={{ paddingTop: '15px' }}>
              <Col span={12}>
                <Row type="flex" justify="space-between">
                  <Col span={8}>
                    <IncremntBtn shape="circle" icon="minus" onClick={() => handleChange(units - 1)} />
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
                    <IncremntBtn shape="circle" icon="plus" onClick={() => handleChange(units + 1)} />
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="end">
                  <strong>Rs. {listing.listingCost.cost * units}</strong>
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