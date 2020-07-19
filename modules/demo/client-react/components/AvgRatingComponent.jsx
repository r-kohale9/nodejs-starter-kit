import React from 'react';
import { Row, Col, Rate, Progress } from 'antd';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { PgTitle, Text } from './StyledComponents';

const Rating = styled(Rate)`
  font-size: 12px;
  padding-right: 10px;
`;

const AvgRatingComponent = props => {
  const { one, two, three, four, five } = props.ratings;
  const totalRatings = one + two + three + four + five;
  function avgRating() {
    return (totalRatings * 5) / totalRatings;
  }
  // console.log('props', totalRatings * 5, one + two * 2 + three * 3 + four * 4 + five * 5);
  return (
    <Row>
      <Col span={6}>
        <Col span={24}>
          <Row type="flex" justify="center">
            <PgTitle>{avgRating()}</PgTitle>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" justify="center">
            <Text>{totalRatings} ratings</Text>
          </Row>
        </Col>
      </Col>
      <Col span={18}>
        <Col span={24}>
          <Col span={22}>
            <Col span={10}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={5} count={5} />
              </Row>
            </Col>
            <Col span={12}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(five / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <Text>{five}</Text>
          </Col>
        </Col>
        <Col span={24}>
          <Col span={22}>
            <Col span={10}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={4} count={4} />
              </Row>
            </Col>
            <Col span={12}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(four / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <Text>{four}</Text>
          </Col>
        </Col>
        <Col span={24}>
          <Col span={22}>
            <Col span={10}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={3} count={3} />
              </Row>
            </Col>
            <Col span={12}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(three / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <Text>{three}</Text>
          </Col>
        </Col>
        <Col span={24}>
          <Col span={22}>
            <Col span={10}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={2} count={2} />
              </Row>
            </Col>
            <Col span={12}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(two / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <Text>{two}</Text>
          </Col>
        </Col>
        <Col span={24}>
          <Col span={22}>
            <Col span={10}>
              <Row type="flex" justify="end">
                <Rating disabled defaultValue={1} count={1} />
              </Row>
            </Col>
            <Col span={12}>
              <Progress
                strokeColor="#fc4c4c"
                showInfo={false}
                percent={(one / totalRatings) * 100}
                strokeLinecap="round"
              />
            </Col>
          </Col>
          <Col span={2}>
            <Text>{one}</Text>
          </Col>
        </Col>
      </Col>
    </Row>
  );
};

AvgRatingComponent.propTypes = {
  ratings: PropTypes.object
};

export default AvgRatingComponent;
