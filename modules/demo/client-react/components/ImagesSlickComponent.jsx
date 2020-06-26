import React from 'react';
import { Row, Col } from 'antd';
import Slider from 'react-slick';

const ImagesSlickComponent = props => {
  const { images } = props;
  const settings = {
    infinite: true,
    centreMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true
  };
  return (
    <Slider {...settings}>
      {images &&
        images.map(img => {
          return (
            <Row align="middle" type="flex" justify="center">
              <Col span={24}>
                <img style={{ height: '104px', paddingRight: '10px' }} alt="" src={img.image} />
              </Col>
            </Row>
          );
        })}
    </Slider>
  );
};

export default ImagesSlickComponent;
