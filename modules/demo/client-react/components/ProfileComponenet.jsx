import React from 'react';
import { Row, Col } from 'antd';

import { PropTypes } from 'prop-types';
import { Text } from './StyledComponents';

const ProfileComponenet = props => {
  const { user } = props;
  console.log('user', user);
  return (
    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <Row justify="start" type="flex" align="middle">
        <Col span={6} align="center" style={{ width: '100px', overflow: 'hidden' }}>
          <Row type="flex" justify="start">
            <img alt="" src={user.thumbnail} height="64px" style={{ borderRadius: '50%' }} />
          </Row>
        </Col>
        <Col span={15}>
          <Row type="flex" justify="start">
            <h3>
              <strong>{user.name}</strong>
            </h3>
            <Text>{user.email}</Text>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

ProfileComponenet.propTypes = {
  user: PropTypes.object
};

export default ProfileComponenet;
