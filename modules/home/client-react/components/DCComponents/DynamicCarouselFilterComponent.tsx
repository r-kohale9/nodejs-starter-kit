import React from 'react';
import PropTypes from 'prop-types';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { FilterLayout, Option, RenderCheckBox, Row, Col, RenderSelect } from '@gqlapp/look-client-react';
import { LABEL } from '@gqlapp/home-common';

import ROUTES from '../../routes';

// types
import { DynamicCarouselViewProps } from './DynamicCarouselView';

export interface DynamicCarouselFilterViewProps extends DynamicCarouselViewProps {
  //
}

const DynamicCarouselFilterView: React.FC<DynamicCarouselFilterViewProps> = props => {
  const {
    filter: { searchText, label, isActive } = {},
    onSearchTextChange,
    onLabelChange,
    onIsActiveChange,
    onFiltersRemove,
    t
  } = props;

  return (
    <FilterLayout
      icon={'BuildOutlined'}
      addRoute={ROUTES.add}
      title={t('dynamicCarousel.heading')}
      // search
      searchTitle={t('dynamicCarousel.filter.search')}
      searchText={searchText}
      onSearchTextChange={onSearchTextChange}
      // components
      onFiltersRemove={() =>
        onFiltersRemove(
          {
            searchText: '',
            label: '',
            isActive: true
          },
          { column: '', order: '' }
        )
      }
      expandChildren={(resetBtn: JSX.Element) => (
        <Row gutter={24}>
          <Col lg={8} md={8} xs={24}>
            <Field
              name="isActive"
              icon={'CheckCircleOutlined'}
              component={RenderCheckBox}
              type="checkbox"
              onChange={() => onIsActiveChange(!isActive)}
              label={t('dynamicCarousel.filter.isActive')}
              inFilter={true}
              checked={isActive}
            />
          </Col>
          <Col lg={8} md={8} xs={24}>
            <Field
              name="label"
              icon="FlagOutlined"
              component={RenderSelect}
              placeholder={t('dynamicCarousel.filter.label')}
              defaultValue={label}
              onChange={e => onLabelChange(e)}
              label={t('dynamicCarousel.filter.label')}
              style={{ width: '100px' }}
              value={label}
              inFilter={true}
              selectStyle={{ width: '100%' }}
            >
              <Option key={1} value={''}>
                All
              </Option>
              {LABEL &&
                LABEL.map((l: string, i: number) => (
                  <Option key={i + 2} value={l}>
                    {l}
                  </Option>
                ))}
            </Field>
          </Col>
          <Col lg={8} md={8} xs={24}>
            {resetBtn}
          </Col>
        </Row>
      )}
    />
  );
};
DynamicCarouselFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onLabelChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  onFiltersRemove: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default DynamicCarouselFilterView;
