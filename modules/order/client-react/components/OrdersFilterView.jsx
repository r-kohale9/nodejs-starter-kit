import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, FormItem, Select, Option, Label, Input } from '@gqlapp/look-client-react';

const OrdersFilterView = ({ filter: { searchText, state }, onSearchTextChange, onStateChange, t }) => (
  <Form layout="inline">
    <FormItem label={t('orders.list.item.filter')}>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        placeholder={t('orders.list.item.search')}
        element={Input}
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
      />
    </FormItem>
    &nbsp;
    <FormItem label={t('orders.list.item.state.label')}>
      <Select name="state" defaultValue={state} style={{ width: '100px' }} onChange={e => onStateChange(e)}>
        <Option key={1} value="">
          {t('orders.list.item.state.all')}
        </Option>
        <Option key={2} value="Delivered">
          {t('orders.list.item.state.delivered')}
        </Option>
        <Option key={3} value="Processing">
          {t('orders.list.item.state.processing')}
        </Option>
        <Option key={4} value="Cancelled">
          {t('orders.list.item.state.cancelled')}
        </Option>
      </Select>
    </FormItem>
  </Form>
);

OrdersFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('order')(OrdersFilterView);
