import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { Modal } from 'antd-mobile';
import { PropTypes } from 'prop-types';

const ModalBar = styled.div`
  margin: 15px 0px 24px 0px;
  width: 60px;
  height: 6px;
  background: #9b9b9b;
  border-radius: 3px;
`;

const ModalComponent = props => {
  const { title, children, visible, handleVisible } = props;

  return (
    <>
      <Modal
        popup
        // visible={true}
        visible={visible}
        onClose={handleVisible}
        animationType="slide-up"
        // afterClose={() => }
      >
        <Row type="flex" justify="center">
          <Col span={24}>
            <Row type="flex" justify="center">
              <ModalBar />
            </Row>
          </Col>
          <Col span={24}>
            <h3>
              <strong>{title && title}</strong>
            </h3>
          </Col>
          <Col span={24} style={{ padding: '22px 16px 0px 16px', maxWidth: '350px', overFlowY: 'auto' }}>
            {children}
          </Col>
        </Row>
      </Modal>
    </>
  );
};
ModalComponent.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  handleVisible: PropTypes.func,
  children: PropTypes.any
};

export default ModalComponent;
