import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { FilterLayout, Option, Col, Row, RenderSelect } from '@gqlapp/look-client-react';

// import ROUTES from '../routes';

// types
import { OrderViewProps } from './OrdersView';

export interface OrderFilterComponentProps extends OrderViewProps {
  //
}

const OrderFilterComponent: React.FC<OrderFilterComponentProps> = props => {
  const {
    filter: { searchText, state },
    orderStates,
    onSearchTextChange,
    onStateChange,
    t,
    onFiltersRemove
  } = props;

  return (
    <FilterLayout
      icon={'FileOutlined'}
      // addRoute={ROUTES.add}
      title={t('orders.subTitle')}
      // search
      searchTitle={t('orders.item.search')}
      searchText={searchText}
      onSearchTextChange={onSearchTextChange}
      // components
      onFiltersRemove={() =>
        onFiltersRemove(
          {
            searchText: '',
            state: ''
          },
          { column: '', order: '' }
        )
      }
      expandChildren={(resetBtn: JSX.Element) => (
        <Row gutter={24}>
          <Col lg={16} md={16} xs={24}>
            {orderStates && orderStates.length !== 0 && (
              <Field
                name="modalName"
                icon={'FilterOutlined'}
                component={RenderSelect}
                placeholder={t('orders.item.sortBy')}
                defaultValue={state}
                onChange={e => onStateChange(e)}
                label={t('orders.item.sortBy')}
                style={{ width: '100px' }}
                value={state}
                inFilter={true}
                selectStyle={{ width: '100%' }}
              >
                <Option key={1} value="">
                  ALL
                </Option>
                {orderStates.map((oS, i) => (
                  <Option key={i + 2} value={oS.state}>
                    {oS.state}
                  </Option>
                ))}
              </Field>
            )}
          </Col>
          <Col lg={8} md={8} xs={24}>
            {resetBtn}
          </Col>
        </Row>
      )}
    />
  );
};

export default translate('order')(OrderFilterComponent);
