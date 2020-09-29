import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { MODAL } from '@gqlapp/review-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Label, Input } from '@gqlapp/look-client-react';

const ReviewsFilterView = ({
  filter: { searchText, isActive },
  onSearchTextChange,
  onIsActiveChange,
  onModalNameChange,
  t
}) => (
  <Form layout="inline">
    <FormItem label={t('adminPanel.filter.field1')}>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        placeholder={t('adminPanel.filter.field1')}
        element={Input}
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
      />
    </FormItem>
    &nbsp; &nbsp;
    <FormItem label={t('adminPanel.filter.field2')}>
      <Select
        name="modal"
        defaultValue={MODAL[0].value}
        style={{ width: '100px' }}
        onChange={e => onModalNameChange(e)}
      >
        {MODAL.map((m, i) => (
          <Option key={i} value={m.value}>
            {m.label}
          </Option>
        ))}
      </Select>
    </FormItem>
    &nbsp; &nbsp;
    <FormItem>
      <Label>
        <Input type="checkbox" defaultChecked={isActive} onChange={() => onIsActiveChange(!isActive)} />
        &nbsp; &nbsp;
        {t('adminPanel.filter.field3')}
      </Label>
    </FormItem>
  </Form>
);

ReviewsFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onModalNameChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('review')(ReviewsFilterView);