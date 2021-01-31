import React from 'react';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { MODAL } from '@gqlapp/review-common';
import { translate } from '@gqlapp/i18n-client-react';
import { RenderCheckBox, Option, Col, Row, RenderSelect, FilterLayout } from '@gqlapp/look-client-react';

// import ROUTES from '../routes';

// types
import { DiscountsViewProps } from './DiscountsView.web';

export interface DiscountsFilterViewProps extends DiscountsViewProps {
  showIsActive: boolean | null;
}

const DiscountsFilterView: React.FC<DiscountsFilterViewProps> = props => {
  const {
    filter: { searchText, modalName = '', isActive },
    showIsActive = true,
    onSearchTextChange,
    onIsActiveChange,
    onModalNameChange,
    onFiltersRemove,
    t
  } = props;

  const modalSelectField = (width: string, inFilter: boolean) => {
    return (
      <Field
        name="modal"
        icon="SafetyCertificateOutlined"
        component={RenderSelect}
        placeholder={t('adminPanel.filter.field2')}
        defaultValue={modalName}
        onChange={(e: string) => onModalNameChange(e)}
        label={t('adminPanel.filter.field2')}
        style={{ width: '100px' }}
        value={modalName}
        inFilter={inFilter}
        selectStyle={{ width }}
      >
        {MODAL.map((m, i) => (
          <Option key={i} value={m.value}>
            {m.label}
          </Option>
        ))}
      </Field>
    );
  };
  return (
    <FilterLayout
      icon={'PercentageOutlined'}
      title={t('discount.subTitle')}
      // addRoute={ROUTES.add}
      // search
      searchTitle={t('adminPanel.filter.field1')}
      searchText={searchText}
      onSearchTextChange={onSearchTextChange}
      // components
      onFiltersRemove={() =>
        onFiltersRemove(
          {
            searchText: '',
            modalName: '',
            isActive: true
          },
          { column: '', order: '' }
        )
      }
      expandChildren={resetBtn => (
        <Row gutter={24}>
          {showIsActive && (
            <Col xs={24} md={8} lg={8}>
              <Field
                name="isActive"
                icon={'CheckCircleOutlined'}
                component={RenderCheckBox}
                type="checkbox"
                onChange={() => onIsActiveChange(!isActive)}
                label={t('adminPanel.filter.field3')}
                inFilter={true}
                checked={isActive}
              />
            </Col>
          )}
          <Col lg={8} xs={24} md={8}>
            <Col lg={0} md={0} xs={24}>
              {modalSelectField('100%', false)}
            </Col>
            <Col xs={0} md={24} lg={24}>
              {modalSelectField('100', true)}
            </Col>
          </Col>
          <Col lg={8} md={8} xs={24}>
            {resetBtn}
          </Col>
        </Row>
      )}
    />
  );
};

export default translate('discount')(DiscountsFilterView);
