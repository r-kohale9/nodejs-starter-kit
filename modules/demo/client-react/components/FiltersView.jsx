import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Slider, List, Button } from 'antd';

import PageLayout from './PageLayout';

const Fixed = styled.div`
  width: 100%;

  position: fixed;
  bottom: 0px;
  z-index: 1000;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
`;

const ChangeBtn = styled(Button)`
  height: 36px;
  box-shadow: 0px 4px 8px rgba(211, 38, 38, 0.25);
  border-radius: 25px;
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
  const { history } = props;
  const [minVal, setMinVal] = useState(700);
  const [maxVal, setMaxVal] = useState(1400);

  const handleChange = value => {
    setMinVal(value[0]);
    setMaxVal(value[1]);
  };
  const marks = {
    100: {
      style: {
        color: 'black',
        transform: 'translate(0, -200%',
        width: 'fit-content'
      },
      label: `Rs. ${minVal}`
    },
    2000: {
      style: {
        color: 'black',
        transform: 'translate(-100%, -200%',
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
                defaultValue={[700, 1400]}
                step={100}
                marks={marks}
                min={100}
                max={2000}
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
                grid={{ column: 6 }}
                dataSource={['.5', '1', '2', '3', '4']}
                renderItem={f => (
                  <List.Item>
                    <Button
                    // type="select"
                    >{`${f}`}</Button>
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
                dataSource={['Cakes', 'Pastries', 'Cookies', 'Break', 'Cupcakes']}
                renderItem={f => (
                  <List.Item>
                    <Button
                      //  type="select"
                      block
                    >{`${f}`}</Button>
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
            <Button type="tertiary" block>
              Discard
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" block>
              Apply
            </Button>
          </Col>
        </Row>
      </Fixed>
    </>
  );
};

export default FiltersView;
