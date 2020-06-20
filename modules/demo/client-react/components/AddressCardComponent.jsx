import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { PropTypes } from 'prop-types';

const AddressCardComponent = props => {
  const { address, handleBtn, extra, btnTitle } = props;
  return (
    <Card
      style={{
        marginBottom: '24px',
        // width: '164px',
        maxHeight: '140px',
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
                {address.addressName}
              </Row>
            </Col>
            <Col span={8}>
              <Row type="flex" justify="end">
                <Button
                  type="link"
                  style={{ color: '#DB3022' }}
                  onClick={handleBtn}
                  // onClick={() => setVisible(addresses.map((add, i) => i === index))}
                >
                  {btnTitle}
                </Button>
                {/* <Modal
                          visible={visible[index]}
                          title={address.addressName}
                          okText="Save"
                          onCancel={() => setVisible(addresses.map(() => false))}
                          onOk={() => setVisible(addresses.map(() => false))}
                        >
                          <AddressForm values={values.addresses[index]} index={index} />
                        </Modal> */}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <p>{`${address.address}, ${address.city}, ${address.state}, ${address.pinCode}`}</p>
        </Col>
        <Col span={24}>{extra && extra}</Col>
      </Row>
    </Card>
  );
};
AddressCardComponent.propTypes = {
  address: PropTypes.array
};
export default AddressCardComponent;
