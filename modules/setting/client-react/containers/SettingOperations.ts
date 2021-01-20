import { FunctionComponent } from 'react';
import { graphql } from 'react-apollo';
import { Message } from '@gqlapp/look-client-react';

// Query
import PLATFORM_QUERY from '../graphql/PlatformQuery.graphql';

// Mutation
import EDIT_PLATFORM from '../graphql/EditPlatform.graphql';

// types
import { EditPlatformInput } from '../../../../packages/server/__generated__/globalTypes';
import { platform as platformResponse, platformVariables } from '../graphql/__generated__/platform';
import { editPlatform as editPlatformResponse, editPlatformVariables } from '../graphql/__generated__/editPlatform';

// Query
export const withPlatform = (Component: FunctionComponent) =>
  graphql<{}, platformResponse, platformVariables, {}>(PLATFORM_QUERY, {
    options: () => {
      // let id = '0';
      // if (props.match) {
      //   id = props.match.params.id;
      // } else if (props.navigation) {
      //   id = props.navigation.state.params.id;
      // }
      return {
        variables: { id: 1 }
      };
    },
    props({ data: { loading, error, platform, subscribeToMore, updateQuery } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, platform, subscribeToMore, updateQuery };
    }
  })(Component);

// Mutation
export const withEditPlatform = (Component: FunctionComponent) =>
  graphql<{}, editPlatformResponse, editPlatformVariables, {}>(EDIT_PLATFORM, {
    props: ({ mutate }) => ({
      editPlatform: async (input: EditPlatformInput) => {
        try {
          Message.destroy();
          Message.loading('Please wait...', 0);
          await mutate({
            variables: {
              input
            }
          });
          Message.destroy();
          Message.success('Changes Saved.');
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);
