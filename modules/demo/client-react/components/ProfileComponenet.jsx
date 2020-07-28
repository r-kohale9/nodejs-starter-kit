import React from 'react';
import { Row, Col } from 'antd';

import { PropTypes } from 'prop-types';
import { Text } from './StyledComponents';

const ProfileComponenet = props => {
  const { user } = props;
  return (
    <div style={{ paddingTop: '40px', paddingBottom: '30px' }}>
      {user && user.profile && (
        <Row justify="start" type="flex" align="middle">
          <Col span={6} align="center" style={{ width: '80px', overflow: 'hidden' }}>
            <Row type="flex" justify="start">
              <img alt="" src={user.profile.imageUrl} height="64px" style={{ borderRadius: '50%' }} />
            </Row>
          </Col>
          <Col span={15}>
            <Row type="flex" justify="start">
              <h3>
                <strong>{user.profile.fullName}</strong>
              </h3>
              <Text>{user.email}</Text>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

ProfileComponenet.propTypes = {
  user: PropTypes.object
};

export default ProfileComponenet;
