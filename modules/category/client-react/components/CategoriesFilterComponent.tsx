import React, { useEffect, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';

import {
  Space,
  Icon,
  RenderCheckBox,
  RenderSelect,
  Option,
  Form,
  FormItem,
  Input,
  Row,
  Col
} from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { MODAL } from '@gqlapp/review-common';

// types
import { FilterCategoryInput } from '../../../../packages/server/__generated__/globalTypes';
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
  const handleFiltersRemove = useRef(() => {});

  handleFiltersRemove.current = () => {
    const filter: FilterCategoryInput = {
      searchText: '',
      modalName: '',
      isActive: true
    };
    const orderBy = { column: '', order: '' };
    onFiltersRemove(filter, orderBy);
  };

  useEffect(() => {
    return () => handleFiltersRemove.current();
  }, []);
  const CategoryIsActiveField = (
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
  );
  const CategorySortByField = (width: string) => {
    return (
      <Field
        name="modalName"
        icon="SafetyCertificateOutlined"
        component={RenderSelect}
        placeholder={t('categories.filter.modalName')}
        defaultValue={MODAL[0].value}
        onChange={(e: string) => onModalNameChange(e)}
        label={t('categories.filter.modalName')}
        style={{ width: '100px' }}
        value={modalName}
        inFilter={true}
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
    <Form onSubmit={{}} /* layout="inline" */>
      <Row type="flex" align="middle">
        <Col span={24}>
          <Row>
            <Col lg={16} xs={24} sm={24} md={14}>
              <Row gutter={24}>
                <Col xs={24} md={24} sm={14} lg={16}>
                  <FormItem
                    label={
                      <Space align="center">
                        <Icon type="SearchOutlined" />
                        {t('categories.filter.search')}
                      </Space>
                    }
                    style={{ width: '100%' }}
                  >
                    <DebounceInput
                      minLength={2}
                      debounceTimeout={300}
                      placeholder={t('categories.filter.search')}
                      element={Input}
                      value={searchText}
                      onChange={e => onSearchTextChange(e.target.value)}
                    />
                  </FormItem>
                </Col>
                <Col xs={24} md={24} sm={10} lg={8}>
                  {CategoryIsActiveField}
                </Col>
              </Row>
            </Col>
            <Col lg={8} xs={24} sm={24} md={10}>
              <Row>
                <Col lg={0} md={0} xs={24}>
                  {CategorySortByField('100%')}
                </Col>
                <Col xs={0} md={24} lg={24}>
                  <Row type="flex" justify="end">
                    {CategorySortByField('170px')}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default CategoriesFilterComponent;
