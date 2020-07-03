import React from 'react';
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { PropTypes } from 'prop-types';
import { Text } from './StyledComponents';

const ProfileMenuItem = props => {
  const {
    data: { title, details, link }
  } = props;

  return (
    <Link to={link}>
      <div style={{ height: '72px' }}>
        <Row justify="space-around" align="middle" type="flex">
          <Col span={20}>
            <Row>
              <Col span={24}>
                <h3>
                  <strong>{title}</strong>
                </h3>
              </Col>
              <Col span={24}>
                <Text>{details}</Text>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Icon type="right" />
          </Col>
        </Row>
      </div>
    </Link>
  );
};

ProfileMenuItem.propTypes = {
  data: PropTypes.object
};

export default ProfileMenuItem;
