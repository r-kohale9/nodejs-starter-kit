import React from 'react';
import { PropTypes } from 'prop-types';
import { Card, Row, Col, Button, Rate, Icon } from 'antd';
import styled from 'styled-components';

import ShoppingBag from '../Icons/shoppingbag.svg';

const BagBtn = styled(Button)`
  position: absolute;
  right: -11px;
  height: 36px;
  width: 36px;
  background: #fc4c4c;
  box-shadow: 0px 4px 4px rgba(219, 48, 34, 0.16);
`;

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

const FavorteItemComponent = props => {
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
            <Row type="flex" align="middle">
              <Col span={22}>
                <Text>{item.category}</Text>
              </Col>
              <Col span={2}>
                <Row>
                  {/* <Button type="link" icon="close" /> */}
                  <Icon type="close" onClick={() => console.log('called')} />
                </Row>
              </Col>
            </Row>
            <Col span={24}>
              <Title>{item.title}</Title>
            </Col>
            <Row>
              <Col span={16}>
                <p style={{ display: 'flex' }}>
                  <Text>Flavour:</Text> <Text color="black">{item.flavour}</Text>
                </p>
              </Col>
              <Col span={8}>
                <p style={{ display: 'flex' }}>
                  <Text>Size:</Text>
                  <Text color="black">{item.weight}</Text>
                </p>
              </Col>
            </Row>
            <Col span={24}>
              <Row>
                <Col span={8}>
                  <Row type="flex" justify="start">
                    Rs. {item.price}
                  </Row>
                </Col>
                <Col span={16}>
                  <Row type="flex" justify="center">
                    <Rate style={{ fontSize: '13px' }} disabled defaultValue={item.rating} /> {`(${item.rating * 2})`}
                  </Row>
                </Col>
              </Row>
            </Col>
            <BagBtn shape="circle">
              <img style={{ width: '16px' }} alt="" src={ShoppingBag} />
            </BagBtn>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default FavorteItemComponent;
