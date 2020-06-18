import React from 'react';
import styled from 'styled-components';
import { Card, Row, Col, Button } from 'antd';
import { PropTypes } from 'prop-types';

const Applybtn = styled(Button)`
  height: 36px;
  background: #fc4c4c;
  box-shadow: 0px 4px 8px rgba(211, 38, 38, 0.25);
  border-radius: 25px;
`;

const PromoCardComponent = props => {
  const { promocode } = props;
  return (
    <Card
      style={{
        marginBottom: '24px',
        height: '80px',
        borderWidth: '0px',
        borderRadius: '8px'
      }}
      bodyStyle={{
        padding: '0px'
      }}
    >
      <Row>
        <Col span={6} align="center" style={{ height: '80px', width: '80px', overflow: 'hidden' }}>
          <img alt="" src={promocode.thumbnail} width="100%" />
        </Col>
        <Col span={18}>
          <Row style={{ padding: '12px 15px 11px 14px' }}>
            <Col span={24}>
              <Row type="flex" justify="end">
                {promocode.validity}
              </Row>
            </Col>
            <Col span={16}>
              <Row type="flex" align="top">
                <Col span={24}>{promocode.title}</Col>
                <Col span={24}>{promocode.promocode}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row type="flex" align="middle">
                <Col span={24}>
                  <Applybtn type="danger" block>
                    Apply
                  </Applybtn>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

PromoCardComponent.propTypes = {
  promocode: PropTypes.object
};

export default PromoCardComponent;
