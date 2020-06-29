import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'antd';
import Slider from 'react-slick';
import styled from 'styled-components';

const Rectangle = styled.div`
  width: 51px;
  height: 51px;
  background: #fc4c4c;
  border-radius: 10px;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #6c6b6b;
`;

const CategoryIconSlick = props => {
  const { data } = props;
  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    variableWidth: true,
    slidesToScroll: 2
  };
  return (
    <div style={{ marginTop: '10px' }}>
      <Slider {...settings}>
        {data.map(slick => {
          const { icon: Icon, category } = slick;
          return (
            <Row align="middle" type="flex" justify="center">
              <Col span={24}>
                <Row align="middle" type="flex" justify="center">
                  <Rectangle>
                    <img src={Icon} alt="" style={{ position: 'relative', top: '5px', left: '5px' }} />
                  </Rectangle>
                </Row>
              </Col>
              <Col span={24}>
                <Row align="middle" type="flex" justify="center">
                  <Text>{category}</Text>
                </Row>
              </Col>
            </Row>
          );
        })}
      </Slider>
    </div>
  );
};

CategoryIconSlick.propTypes = {
  data: PropTypes.array
};

export default CategoryIconSlick;
