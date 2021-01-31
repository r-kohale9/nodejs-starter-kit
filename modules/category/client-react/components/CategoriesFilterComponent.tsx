import React from 'react';

import { FilterLayout, RenderCheckBox, RenderSelect, Option, Row, Col } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { MODAL } from '@gqlapp/review-common';

import ROUTES from '../routes';

// types
import { CategoriesViewProps } from './CategoriesView.web';

export interface CategoriesFilterComponentProps extends CategoriesViewProps {
  //
}

const CategoriesFilterComponent: React.FC<CategoriesFilterComponentProps> = props => {
  const {
    filter: { searchText, isActive, modalName = '' },
    onSearchTextChange,
    onIsActiveChange,
    onFiltersRemove,
    onModalNameChange,
    t
  } = props;

  return (
    <FilterLayout
      addRoute={ROUTES.add}
      title={t('category.subTitle')}
      // search
      searchTitle={t('categories.filter.search')}
      searchText={searchText}
      onSearchTextChange={onSearchTextChange}
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
      expandChildren={
        <Row gutter={24}>
          <Col lg={12} xs={24} md={14}>
            <Field
              name="isActive"
              icon={'CheckCircleOutlined'}
              component={RenderCheckBox}
              type="checkbox"
              onChange={() => onIsActiveChange(!isActive)}
              label={t('categories.filter.isActive')}
              inFilter={true}
              checked={isActive}
            />
          </Col>
          <Col lg={12} xs={24} md={10}>
            <Field
              name="modalName"
              icon="SafetyCertificateOutlined"
              component={RenderSelect}
              placeholder={t('categories.filter.modalName')}
              defaultValue={modalName}
              onChange={(e: string) => onModalNameChange(e)}
              label={t('categories.filter.modalName')}
              style={{ width: '100px' }}
              value={modalName}
              inFilter={true}
              selectStyle={{ width: '100%' }}
            >
              {MODAL.map((m, i) => (
                <Option key={i} value={m.value}>
                  {m.label}
                </Option>
              ))}
            </Field>
          </Col>
        </Row>
      }
    />
  );
};

export default CategoriesFilterComponent;
