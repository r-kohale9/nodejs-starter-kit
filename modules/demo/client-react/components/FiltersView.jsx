import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { withFormik } from 'formik';
import { Row, Col, Slider, List, Button } from 'antd';

import PageLayout from './PageLayout';
import { MINVAL, MAXVAL, CATEGORY, WEIGHTS } from '../containers/Constants';

const Fixed = styled.div`
  width: 100%;

  position: fixed;
  bottom: 0px;
  z-index: 1000;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
`;

const Margin2 = styled.h3`
  margin: 2% 0 2% 0;
`;

const OptDiv = styled.div`
  margin: 0 -200% 0 -200%;
  padding: 24px 200% 4px 200%;
  background: white;
`;

const FiltersView = props => {
  const { history, values, setFieldValue, onFilterChange, handleSubmit } = props;
  const [minVal, setMinVal] = useState(values && values.priceRange && values.priceRange.min);
  const [maxVal, setMaxVal] = useState(MAXVAL);

  const handleChange = value => {
    setMinVal(value[0]);
    setFieldValue('priceRange.min', value[0]);
    setMaxVal(value[1]);
    setFieldValue('priceRange.max', value[1]);
  };
  const handleWeightSelect = weight => {
    const index = values.weights && values.weights.indexOf(values.weights.filter(w => w.weight === weight)[0]);
    index === -1
      ? setFieldValue('weights', [...values.weights, { weight: weight, __typename: 'WeightInput' }])
      : setFieldValue('weights', values.weights.splice(index, 0));
  };

  const handleCategoriesSelect = category => {
    const index =
      values.categories && values.categories.indexOf(values.categories.filter(w => w.category === category)[0]);
    index === -1
      ? setFieldValue('categories', [...values.categories, { category: category, __typename: 'FlavourInput' }])
      : setFieldValue('categories', values.categories.splice(index, 0));
  };
  // const handleFlavoursSelect = flavour => {
  //   const index = values.flavours && values.flavours.indexOf(values.flavours.filter(w => w.flavour === flavour)[0]);
  //   index === -1
  //     ? setFieldValue('flavours', [...values.flavours, { flavour: flavour, __typename: 'FlavourInput' }])
  //     : setFieldValue('flavours', values.flavours.splice(index, 0));
  // };

  const marks = {
    100: {
      style: {
        color: 'black',
        transform: 'translate(0, -200%)',
        width: 'fit-content'
      },
      label: `Rs. ${minVal}`
    },
    2000: {
      style: {
        color: 'black',
        transform: 'translate(-100%, -200%)',
        width: 'fit-content'
      },
      label: `Rs. ${maxVal}`
    }
  };
  return (
    <>
      <PageLayout history={history} title="Filters">
        <Row>
          <Col span={24}>
            <Margin2>Price range</Margin2>
          </Col>
          <Col span={24}>
            <OptDiv>
              <Slider
                range
                defaultValue={[MINVAL * 2, MAXVAL / 2]}
                step={50}
                marks={marks}
                min={MINVAL}
                max={MAXVAL}
                onChange={handleChange}
              />
            </OptDiv>
          </Col>
          <Col span={24}>
            <Margin2>Weight</Margin2>
          </Col>
          <Col span={24}>
            <OptDiv>
              <List
                grid={{ column: 4 }}
                dataSource={WEIGHTS}
                renderItem={f => (
                  <List.Item>
                    {values && values.weights && values.weights.filter(w => w.weight === f).length > 0 ? (
                      <Button type="primary" onClick={() => handleWeightSelect(f)}>{`${f}`}</Button>
                    ) : (
                      <Button onClick={() => handleWeightSelect(f)}>{`${f}`}</Button>
                    )}
                  </List.Item>
                )}
              />
            </OptDiv>
          </Col>
          <Col span={24}>
            <Margin2>Category</Margin2>
          </Col>
          <Col span={24}>
            <OptDiv>
              <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={CATEGORY}
                renderItem={f => (
                  <List.Item>
                    {values && values.categories && values.categories.filter(w => w.category === f).length > 0 ? (
                      <Button type="primary" onClick={() => handleCategoriesSelect(f)}>{`${f}`}</Button>
                    ) : (
                      <Button onClick={() => handleCategoriesSelect(f)}>{`${f}`}</Button>
                    )}
                  </List.Item>
                )}
              />
            </OptDiv>
          </Col>
        </Row>
      </PageLayout>
      <Fixed>
        <Row gutter={[23, 0]}>
          <Col span={12}>
            <Button type="tertiary" block onClick={() => history.push('/demo/home')}>
              Discard
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" block onClick={() => handleSubmit(values)}>
              Apply
            </Button>
          </Col>
        </Row>
      </Fixed>
    </>
  );
};
FiltersView.propTypes = {
  history: PropTypes.object,
  values: PropTypes.object,
  setFieldValue: PropTypes.func
};

const FiltersWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    priceRange: {
      min: (props.filter && props.filter.priceRange && props.filter.priceRange.min) || MINVAL,
      max: (props.filter && props.filter.priceRange && props.filter.priceRange.max) || MAXVAL
    },
    categories: (props.filter && props.filter.category) || [],
    weights: (props.filter && props.filter.weights) || [],
    flavours: (props.filter && props.filter.flavours) || []
  }),
  async handleSubmit(values, { props: { onFilterChange } }) {
    onFilterChange(values);
  },
  displayName: 'Filters Form' // helps with React DevTools
});
export default FiltersWithFormik(FiltersView);
