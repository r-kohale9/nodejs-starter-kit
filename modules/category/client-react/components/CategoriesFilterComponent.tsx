import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';

import {
  Heading,
  Affix,
  Collapse,
  CollapsePanel,
  Space,
  Icon,
  RenderCheckBox,
  RenderSelect,
  Option,
  Form,
  AddIcon,
  FormItem,
  Input,
  Row,
  Col
} from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { MODAL } from '@gqlapp/review-common';

import ROUTES from '../routes';

// types
import { FilterCategoryInput } from '../../../../packages/server/__generated__/globalTypes';
import { CategoriesViewProps } from './CategoriesView.web';

const FilterTitle = styled.div`
  position: absolute;
  top: 24%;
`;

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
    <Affix offsetTop={44}>
      <Collapse>
        <CollapsePanel
          header={
            <FilterTitle>
              <Heading type="2">
                <Icon type="ProfileOutlined" />
                &nbsp;
                {t('category.subTitle')}
              </Heading>
            </FilterTitle>
          }
          extra={
            <Row type="flex">
              <Col lg={24} md={24} xs={0}>
                <Space align="center">
                  <FormItem
                    label={
                      <Space align="center">
                        <Icon type="SearchOutlined" />
                        {t('categories.filter.search')}
                      </Space>
                    }
                    style={{ width: '100%', marginBottom: '0px' }}
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
                  <Link to={ROUTES.add}>
                    <AddIcon shape="sqaure" /* color="default" */ />
                  </Link>
                </Space>
              </Col>
              <Col lg={0} md={0} xs={24}>
                <Link to={ROUTES.add}>
                  <AddIcon shape="sqaure" /* color="default" */ />
                </Link>
              </Col>
            </Row>
          }
        >
          <Form onSubmit={{}}>
            <Row gutter={24}>
              <Col lg={0} md={0} xs={24}>
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
              <Col lg={12} xs={24} md={14}>
                {CategoryIsActiveField}
              </Col>
              <Col lg={12} xs={24} md={10}>
                {CategorySortByField('100%')}
              </Col>
            </Row>
          </Form>
        </CollapsePanel>
      </Collapse>
    </Affix>
  );
};

export default CategoriesFilterComponent;
