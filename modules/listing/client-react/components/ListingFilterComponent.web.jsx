import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Label, Input } from '@gqlapp/look-client-react';
import { CATEGORY } from '@gqlapp/demo-client-react/containers/Constants';

const ListingsFilterView = ({
  filter: { searchText, state, isActive },
  onIsActiveChange,
  onSearchTextChange,
  onCategoryChange,
  t
}) => (
  <Form layout="inline">
    {/* {console.log('filter', isActive)} */}
    <FormItem label={t('listings.list.item.filter')}>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        placeholder={t('listings.list.item.search')}
        element={Input}
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
      />
    </FormItem>
    &nbsp;
    <FormItem label={t('listings.list.item.state.label')}>
      <Select name="state" defaultValue={state} style={{ width: '100px' }} onChange={e => onCategoryChange(e)}>
        <Option key={1} value="">
          {t('listings.list.item.state.all')}
        </Option>
        {CATEGORY &&
          CATEGORY.map((category, c) => (
            <Option key={c + 1} value={category}>
              {t(`listings.list.item.state.${category}`)}
            </Option>
          ))}
      </Select>
    </FormItem>
    &nbsp;
    <FormItem>
      <Label>
        <Input type="checkbox" defaultChecked={isActive} onChange={e => onIsActiveChange(e)} />
        {t('users.list.item.active')}
      </Label>
    </FormItem>
  </Form>
);

ListingsFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('listing')(ListingsFilterView);
