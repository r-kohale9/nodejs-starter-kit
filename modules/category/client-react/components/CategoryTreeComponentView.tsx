import React, { useState } from 'react';
import { ApolloClient } from 'apollo-client';
import { withApollo } from 'react-apollo';

import { FormItem, TreeSelect, Space, Icon } from '@gqlapp/look-client-react';

import CATEGORY_QUERY from '../graphql/CategoryQuery.graphql';
// type
import { CategoryTreeComponentProps } from '../containers/CategoryTreeComponent';

interface CategoryTreeComponentViewProps extends CategoryTreeComponentProps {
  client: ApolloClient<any>;
  icon: string;
  nullable: boolean;
  disableParent: boolean;
  inFilter: boolean;
  name: string | null;
  label: string | null;
  value: string | null;
  onChange: (value: any) => void;
}

const CategoryTreeComponentView: React.FunctionComponent<CategoryTreeComponentViewProps> = props => {
  const {
    icon = 'ProfileOutlined',
    categories,
    nullable = true,
    formik,
    name,
    client,
    disableParent = false,
    inFilter = false
  } = props;
  const [data, setData] = useState([
    nullable && {
      id: 'abc',
      pId: 0,
      title: 'Parent Category',
      value: null,
      isLeaf: true
    },
    ...(categories.edges &&
      categories.totalCount > 0 &&
      categories.edges.map(c => {
        return {
          id: c.node.id,
          pId: c.node.parentCategoryId ? c.node.parentCategoryId : 0,
          title: c.node.title,
          value: c.node.id,
          isLeaf: c.node.isLeaf,
          disabled: disableParent && !c.node.isLeaf
        };
      }))
  ]);
  const onChange = (value: any) => {
    const { onChange: onTextChange } = props;
    if (onTextChange) {
      onTextChange(value);
    } else {
      formik.setFieldValue(name, value);
    }
  };

  const LoadData = async treeNode => {
    const {
      data: { category },
      loading
    } = await client.query({
      query: CATEGORY_QUERY,
      variables: {
        id: treeNode.id
      }
    });
    loading
      ? setData([
          nullable && {
            id: 'abc',
            pId: 0,
            title: 'Parent Category',
            value: null,
            isLeaf: true
          },
          ...(categories.edges &&
            categories.totalCount > 0 &&
            categories.edges.map(c => {
              return {
                id: c.node.id,
                pId: c.node.parentCategoryId ? c.node.parentCategoryId : 0,
                title: c.node.title,
                value: c.node.id,
                isLeaf: c.node.isLeaf,
                disabled: disableParent && !c.node.isLeaf
              };
            }))
        ])
      : setData(
          data.concat(
            category.subCategories.map(sC => {
              return {
                id: sC.id,
                pId: sC.parentCategoryId,
                value: sC.id,
                title: sC.title,
                isLeaf: sC.isLeaf,
                disabled: disableParent && !sC.isLeaf
              };
            })
          )
        );
  };

  const labels = inFilter
    ? {}
    : {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      };

  return (
    <FormItem
      label={
        <Space align="center">
          {icon && <Icon type={icon} />}
          {props.label}
        </Space>
      }
      style={{ width: '100%' }}
      {...labels}
    >
      <TreeSelect
        treeDataSimpleMode
        showSearch
        style={{ width: '100%' }}
        value={props.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll={false}
        onChange={onChange}
        loadData={LoadData}
        treeData={data}
      />
    </FormItem>
  );
};

export default withApollo(CategoryTreeComponentView);
