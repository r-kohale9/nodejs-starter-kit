import React from 'react';
import Slider from 'react-slick';
import { PropTypes } from 'prop-types';

const HomeSlick = props => {
  const { data } = props;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      {data.map(slick => {
        return (
          <div>
            <img
              alt=""
              src={slick.thumbnail}
              style={{
                height: '110px',
                width: '100%',
                borderRadius: '10px',
                objectFit: 'cover'
              }}
            />
          </div>
        );
      })}
    </Slider>
  );
};

HomeSlick.propTypes = {
  data: PropTypes.array
};

export default HomeSlick;
