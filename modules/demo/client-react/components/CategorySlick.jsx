import React from 'react';
import { Row, Col, Button } from 'antd';
import Slider from 'react-slick';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const PadR10 = styled.div`
  padding-right: 10px;
`;

const CategoryIconSlick = props => {
  const { data, setCategory, filter } = props;
  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    variableWidth: true
  };
  return (
    <Slider {...settings}>
      {data.map(slick => {
        const { category } = slick;
        return (
          <PadR10>
            <Row align="middle" type="flex" justify="space-around">
              <Col span={24}>
                {console.log('category')}
                {filter.categories.filter(c => c.category === category).length > 0 ? (
                  <Button
                    type="tertiary"
                    //  onClick={}
                  >
                    {category}
                  </Button>
                ) : (
                  <Button type="black" onClick={() => setCategory(category)}>
                    {category}
                  </Button>
                )}
              </Col>
            </Row>
          </PadR10>
        );
      })}
    </Slider>
  );
};

CategoryIconSlick.propTypes = {
  data: PropTypes.array,
  setCategory: PropTypes.func
};

export default CategoryIconSlick;
