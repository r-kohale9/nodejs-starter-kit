import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { PropTypes } from 'prop-types';

const PromoCardComponent = props => {
  const { promocode, onApply } = props;
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
        <Col span={6} align="center" style={{ height: '80px', width: '80px', overflow: 'hidden' }}>
          <img alt="" src={promocode.imageUrl} width="100%" />
        </Col>
        <Col span={17}>
          <Row style={{ padding: '12px 15px 11px 14px' }}>
            <Col span={24}>
              <Row type="flex" justify="end">
                <small>{promocode.validity} days remaining</small>
              </Row>
            </Col>
            <Col span={24}>
              <Col span={16}>
                <Row type="flex" justify="start" align="top">
                  <Col span={24}>{promocode.title}</Col>
                  <Col span={24}>
                    <small>{promocode.promoCode}</small>
                  </Col>
                </Row>
              </Col>
              <Col span={8} style={{ paddingTop: '5px' }}>
                <Row type="flex" align="bottom">
                  <Button
                    style={{ width: 'fit-content' }}
                    type="primary"
                    block
                    onClick={() => onApply(promocode.promocode)}
                  >
                    Apply
                  </Button>
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

PromoCardComponent.propTypes = {
  promocode: PropTypes.object,
  onApply: PropTypes.func
};

export default PromoCardComponent;
