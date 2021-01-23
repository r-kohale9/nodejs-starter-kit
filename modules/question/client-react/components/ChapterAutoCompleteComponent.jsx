import React from 'react';
import debounce from 'lodash/debounce';
import { graphql } from 'react-apollo';
import { PropTypes } from 'prop-types';

import { RenderAutoComplete } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { PLATFORM, compose, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

import CHAPTER_STATE_QUERY from '../graphql/ChaptersStateQuery.client.graphql';
import CHAPTERS_QUERY from '../graphql/ChaptersQuery.graphql';
import UPDATE_CHAPTER_FILTER from '../graphql/UpdateChapterFilter.client.graphql';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server' ? settings.pagination.web.itemsNumber : settings.pagination.mobile.itemsNumber;

const ChapterAutoCompleteComponent = (props) => {
  const { name, setValue, label, defaultValue, onSearchTextChange } = props;
  const handleChapterSelect = (value) => {
    setValue(props.chapters.edges.filter((i) => i.node.title === value)[0].node.id);
  };
  // console.log('props', props);
  return (
    <>
      {/* <h1>bleh</h1> */}
      <Field
        name={name}
        dataSource={props.chapters && props.chapters.edges.map((item) => item.node.title)}
        component={RenderAutoComplete}
        label={label}
        type="text"
        defaultValue={defaultValue}
        // value={value}
        onSelect={handleChapterSelect}
        onSearch={debounce(onSearchTextChange, 300)}
      />
    </>
  );
};

ChapterAutoCompleteComponent.propTypes = {
  name: PropTypes.string,
  chapters: PropTypes.object,
  setValue: PropTypes.func,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onSearchTextChange: PropTypes.func,
};

export default compose(
  graphql(CHAPTER_STATE_QUERY, {
    props({ data }) {
      return removeTypename(data.chaptersState);
    },
  }),
  graphql(CHAPTERS_QUERY, {
    options: ({ orderBy, filter, subjectId }) => {
      filter.subjectId = subjectId;
      return {
        // eslint-disable-next-line prettier/prettier
        variables: {
          limit: limit,
          after: 0,
          orderBy,
          filter,
        },
        fetchPolicy: 'network-only',
      };
    },
    props: ({ data }) => {
      const { loading, error, chapters, fetchMore, updateQuery, subscribeToMore } = data;
      // console.log("ops", users);
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after,
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.chapters.totalCount;
            const newEdges = fetchMoreResult.chapters.edges;
            const pageInfo = fetchMoreResult.chapters.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.chapters.edges, ...newEdges] : newEdges;

            return {
              chapters: {
                // By returning `cursor` here, we update the `fetchMore` function
                // to the new cursor.

                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Profiles',
              },
            };
          },
        });
      };
      if (error) throw new Error(error);
      return {
        loading,
        chapters,
        loadData,
        updateQuery,
        subscribeToMore,
      };
    },
  }),
  graphql(UPDATE_CHAPTER_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
    }),
  })
)(translate('question')(ChapterAutoCompleteComponent));
