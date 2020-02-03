import React from 'react';
import {
  message
  // , Spin
} from 'antd';
import { graphql } from 'react-apollo';
// import { PropTypes } from 'prop-types';

import { compose, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import EVENT_QUERY from '../graphql/EventQuery.graphql';
import EDIT_EVENT from '../graphql/EditEvent.graphql';

import EditEventView from '../components/EditEventView.web';

class EditEvent extends React.Component {
  render() {
    console.log('props', this.props);
    return <EditEventView {...this.props} />;
  }
}

// EditEvent.propTypes = {
// };

export default compose(
  graphql(EVENT_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, event, subscribeToMore } }) {
      if (error) throw new Error(error);
      return { loading, event, subscribeToMore };
    }
  }),
  graphql(EDIT_EVENT, {
    props: ({ ownProps: { history }, mutate }) => ({
      editEvent: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          const input = removeTypename(values);
          // removeTypename converts array into object which should not happen so we do the below to convert it back.
          input.admins = Object.values(input.admins);
          await mutate({
            variables: {
              input: input
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          return history.push('/events');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  translate('events')
)(EditEvent);
