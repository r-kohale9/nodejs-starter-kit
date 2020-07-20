import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import CHANGE_PASSWORD from '@gqlapp/user-client-react/graphql/ChangePassword.graphql';

import SettingsView from '../components/SettingsView';

const Settings = props => {
  const { changePassword } = props;

  const handleSubmit = async values => {
    console.log('values', values);
    try {
      await changePassword({
        username: values.username,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  console.log('props', props);
  return <SettingsView {...props} onSubmit={handleSubmit} />;
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  }),
  graphql(CHANGE_PASSWORD, {
    props: ({ mutate, ownProps: { history } }) => ({
      changePassword: async input => {
        await mutate({
          variables: { input }
        });

        history.push('/demo/profile');
      }
    })
  })
)(Settings);
