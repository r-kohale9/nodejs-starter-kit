import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, Button, Icon, List } from 'antd';
import styled from 'styled-components';

import ModalComponent from './ModalComponent';

const Divider = styled.div`
  margin: 16px 0px 16px 0px;
  width: 100%;
  opacity: 0.25;
  border: 0.4px solid #9b9b9b;
`;

const WeightBtn = styled(Button)`
  height: 40px;
  box-sizing: border-box;
  border-radius: 8px;
  &:hover {
    border: 0.4px solid #f01f0e;
  }
`;

const SelectModal = props => {
  const { title, fields, info } = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <WeightBtn block onClick={() => setVisible(true)}>
        {title}
        <Icon type="down" style={{ fontSize: '11px' }} />
      </WeightBtn>
      <ModalComponent
        title={`Select ${title}`}
        // visible={true}
        visible={visible}
        handleVisible={() => setVisible(false)}
      >
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={fields}
          renderItem={f => (
            <List.Item>
              <Button
                // style={{ width: 'fit-content' }}
                block
              >{`${f}`}</Button>
            </List.Item>
          )}
        />
        <Divider />
        <Row type="flex" align="middle">
          <Col span={20}>
            <Row type="flex" justify="start">
              {info}
            </Row>
          </Col>
          <Col span={4}>
            <Row type="flex" justify="end">
              <Icon type="right" />
            </Row>
          </Col>
        </Row>
        <Divider />
        <div style={{ padding: '45px' }} />
      </ModalComponent>
    </>
  );
};

SelectModal.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.array,
  info: PropTypes.string
};

export default SelectModal;
