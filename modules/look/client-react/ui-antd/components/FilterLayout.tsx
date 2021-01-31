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
  Form,
  AddIcon,
  FormItem,
  Input,
  Row,
  Col
} from '@gqlapp/look-client-react';

const FilterTitle = styled.div`
  position: absolute;
  top: 24%;
`;

export interface FilterLayoutProps {
  title: string;
  searchTitle: string;
  searchText: string;
  addRoute: string;
  expandChildren: JSX.Element;
  onFiltersRemove: () => void;
  onSearchTextChange: (searchText: string) => void;
}

const FilterLayout: React.FC<FilterLayoutProps> = props => {
  const { title, searchTitle, searchText, onSearchTextChange, addRoute, expandChildren, onFiltersRemove } = props;

  const handleFilterRemove = useRef(() => {});

  handleFilterRemove.current = () => {
    onFiltersRemove();
  };

  useEffect(() => {
    return () => handleFilterRemove.current();
  }, []);

  const AddBtn = (
    <Link to={addRoute}>
      <AddIcon shape="sqaure" /* color="default" */ />
    </Link>
  );
  return (
    <Affix offsetTop={44}>
      <Collapse>
        <CollapsePanel
          header={
            <FilterTitle>
              <Heading type="2">
                <Icon type="ProfileOutlined" />
                &nbsp;
                {title}
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
                        {searchTitle}
                      </Space>
                    }
                    style={{ width: '100%', marginBottom: '0px' }}
                  >
                    <DebounceInput
                      minLength={2}
                      debounceTimeout={300}
                      placeholder={searchTitle}
                      element={Input}
                      value={searchText}
                      onChange={e => onSearchTextChange(e.target.value)}
                    />
                  </FormItem>
                  {AddBtn}
                </Space>
              </Col>
              <Col lg={0} md={0} xs={24}>
                {AddBtn}
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
                      {searchTitle}
                    </Space>
                  }
                  style={{ width: '100%' }}
                >
                  <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    placeholder={searchTitle}
                    element={Input}
                    value={searchText}
                    onChange={e => onSearchTextChange(e.target.value)}
                  />
                </FormItem>
              </Col>
            </Row>
            {expandChildren}
          </Form>
        </CollapsePanel>
      </Collapse>
    </Affix>
  );
};

export default FilterLayout;
