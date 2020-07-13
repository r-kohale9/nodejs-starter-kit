import React from 'react';
import { PropTypes } from 'prop-types';
import { Card, Row, Col, Button, Rate, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from './StyledComponents';
import ShoppingBag from '../Icons/shoppingbag.svg';

const BagBtn = styled(Link)`
  position: absolute;
  right: 7px;
  bottom: 12px;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background: #fc4c4c;
  box-shadow: 0px 4px 4px rgba(219, 48, 34, 0.16);
`;

const FavorteItemComponent = props => {
  const { item, onBookmark } = props;
  return (
    <>
      <Card
        style={{
          background: '#FFFFFF',
          boxShadow: '0px 1px 24px rgba(0, 0, 0, 0.12)',
          marginBottom: '24px',
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
              <img alt="example" src={item.listingImages[0].imageUrl} />
            </div>
          </Col>
          <Col span={16} style={{ padding: '11px' }}>
            <Row gutter={[0, 3]}>
              <Row type="flex" align="middle">
                <Col span={22}>
                  <Text>{item.category}</Text>
                </Col>
                <Col span={2}>
                  <Row>
                    <Icon type="close" onClick={() => onBookmark(item.id)} />
                  </Row>
                </Col>
              </Row>
              <Col span={24}>
                <h3>
                  <strong>{item.title}</strong>
                </h3>
              </Col>
              <Row>
                <Col span={14}>
                  <p style={{ display: 'flex' }}>
                    <Text>Flavour:</Text> <Text color="black">{item.flavour}</Text>
                  </p>
                </Col>
                <Col span={10}>
                  <p style={{ display: 'flex' }}>
                    <Text>Size:</Text>
                    <Text color="black">{item.listingCost.weight}</Text>
                  </p>
                </Col>
              </Row>
              <Col span={24}>
                <Row>
                  <Col span={7}>
                    <Row type="flex" justify="start">
                      Rs. {item.listingCost.cost}
                    </Row>
                  </Col>
                  <Col span={16}>
                    <Rate style={{ fontSize: '13px' }} disabled defaultValue={item.rating} />
                    <small style={{ paddingLeft: '5px' }}>{`(${item.rating})`}</small>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <BagBtn
        to={{
          pathname: `/demo/listing-detail/${item.id}`,
          preOrder: true // your data array of objects
        }}
      >
        <img style={{ width: '16px', margin: '10px' }} alt="" src={ShoppingBag} />
      </BagBtn>
    </>
  );
};

FavorteItemComponent.propTypes = {
  item: PropTypes.object
};

export default FavorteItemComponent;
