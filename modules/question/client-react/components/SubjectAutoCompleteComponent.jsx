import React from 'react';
import debounce from 'lodash/debounce';
import { graphql } from 'react-apollo';
import { PropTypes } from 'prop-types';

import { RenderAutoComplete } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { PLATFORM, compose, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

import SUBJECT_STATE_QUERY from '../graphql/SubjectsStateQuery.client.graphql';
import SUBJECTS_QUERY from '../graphql/SubjectsQuery.graphql';
import UPDATE_SUBJECT_FILTER from '../graphql/UpdateSubjectFilter.client.graphql';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const SubjectAutoCompleteComponent = props => {
  const { name, setValue, label, defaultValue, onSearchTextChange } = props;
  const handleSubjectSelect = value => {
    setValue(props.subjects.edges.filter(i => i.node.title === value)[0].node.id);
  };
  // console.log('props', props);
  return (
    <>
      {/* <h1>bleh</h1> */}
      <Field
        name={name}
        dataSource={props.subjects && props.subjects.edges.map(item => item.node.title)}
        component={RenderAutoComplete}
        label={label}
        type="text"
        defaultValue={defaultValue}
        // value={value}
        onSelect={handleSubjectSelect}
        onSearch={debounce(onSearchTextChange, 300)}
      />
    </>
  );
};

SubjectAutoCompleteComponent.propTypes = {
  name: PropTypes.string,
  subjects: PropTypes.object,
  setValue: PropTypes.func,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onSearchTextChange: PropTypes.func
};

export default compose(
  graphql(SUBJECT_STATE_QUERY, {
    props({ data }) {
      return removeTypename(data.subjectsState);
    }
  }),
  graphql(SUBJECTS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        // eslint-disable-next-line prettier/prettier
        variables: {
          limit: limit,
          after: 0,
          orderBy,
          filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, subjects, fetchMore, updateQuery, subscribeToMore } = data;
      // console.log("ops", users);
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.subjects.totalCount;
            const newEdges = fetchMoreResult.subjects.edges;
            const pageInfo = fetchMoreResult.subjects.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.subjects.edges, ...newEdges] : newEdges;

            return {
              subjects: {
                // By returning `cursor` here, we update the `fetchMore` function
                // to the new cursor.

                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Profiles'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return {
        loading,
        subjects,
        loadData,
        updateQuery,
        subscribeToMore
      };
    }
  }),
  graphql(UPDATE_SUBJECT_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      }
    })
  })
)(translate('question')(SubjectAutoCompleteComponent));
