import React from 'react';
import { PropTypes } from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import {
  withListings,
  withListingsDeleting,
  withToogleListingActive,
  withListingsStateQuery,
  withUpdateListingsFilter,
  withListingsOrderByUpdating
} from '@gqlapp/listing-client-react/containers/ListingOperations';
import FiltersView from '../components/FiltersView';

const Filters = props => {
  console.log('props', props);
  return <FiltersView {...props} />;
};

export default compose(
  withListingsStateQuery,
  withListingsOrderByUpdating,
  withUpdateListingsFilter,
  withListings,
  withListingsDeleting,
  withToogleListingActive,
  translate('demo')
)(Filters);
