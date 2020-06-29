import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, Button, Icon, List } from 'antd';

import ModalComponent from './ModalComponent';
import { Divider } from './StyledComponents';

const SelectModal = props => {
  const { name, title, fields, info, value, handleField } = props;
  const [visible, setVisible] = useState(false);

  const handleSelect = value => {
    handleField(name, value);
    setVisible(false);
  };

  return (
    <>
      <Button block onClick={() => setVisible(true)}>
        {value === '' ? title : value}
        <Icon type="down" style={{ fontSize: '11px' }} />
      </Button>
      <ModalComponent title={`Select ${title}`} visible={visible} handleVisible={() => setVisible(false)}>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={fields}
          renderItem={f => (
            <List.Item>
              {value === f ? (
                <Button type="select" block onClick={() => handleSelect('')}>{`${f}`}</Button>
              ) : (
                <Button style={{ width: 'fit-content' }} block onClick={() => handleSelect(`${f}`)}>{`${f}`}</Button>
              )}
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
  name: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  fields: PropTypes.array,
  info: PropTypes.string,
  handleField: PropTypes.func
};

export default SelectModal;
