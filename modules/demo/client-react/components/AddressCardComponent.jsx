import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { PropTypes } from 'prop-types';

const AddressCardComponent = props => {
  const { address, handleBtn, extra, btnTitle } = props;
  return (
    <Card
      style={{
        background: '#FFFFFF',
        boxShadow: '0px 1px 24px rgba(0, 0, 0, 0.12)',
        marginBottom: '24px',
        // maxHeight: '140px',
        borderWidth: '0px',
        borderRadius: '8px'
      }}
      hoverable
      bodyStyle={{
        padding: '18px 23px 18px 28px'
      }}
    >
      <Row>
        <Col span={24}>
          <Row type="flex" align="middle">
            <Col span={16}>
              <Row type="flex" justify="start">
                <strong>{address.addressName}</strong>
              </Row>
            </Col>
            <Col span={8}>
              <Row type="flex" justify="end">
                <Button type="link" style={{ color: '#DB3022' }} onClick={handleBtn}>
                  {btnTitle}
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <strong>
            <p>{`${address.shippingAddress}, ${address.city}, ${address.state}, ${address.pinCode}`}</p>
          </strong>
        </Col>
        {extra && (
          <Col span={24} style={{ height: '35px' }}>
            {extra && extra}
          </Col>
        )}
      </Row>
    </Card>
  );
};
AddressCardComponent.propTypes = {
  address: PropTypes.array,
  handleBtn: PropTypes.func,
  extra: PropTypes.any,
  btnTitle: PropTypes.string
};
export default AddressCardComponent;
