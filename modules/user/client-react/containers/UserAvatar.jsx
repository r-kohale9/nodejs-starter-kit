import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { Avatar } from '@gqlapp/look-client-react/ui-antd/components';

import CURRENT_USER_AVATAR_QUERY from '../graphql/CurrentUserQuery.graphql';

const UserAvatar = props => {
  // var userAvatarUrl;
  const profile = !props.loading && props.currentUser && props.currentUser.profile;

  // console.log(userAvatarUrl);

  return <Avatar size={props.size} shape={props.shape} src={profile && profile.avatar} icon="user" />;
};

UserAvatar.propTypes = {
  loading: PropTypes.boolean,
  currentUser: PropTypes.object,
  size: PropTypes.number,
  shape: PropTypes.string
};

export default compose(
  graphql(CURRENT_USER_AVATAR_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { loading, currentUser };
    }
  })
)(UserAvatar);
