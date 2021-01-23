import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete as ADAutoComplete } from 'antd';

import FormItem from './FormItem';

const RenderAutoComplete = ({ icon, children, label, placeholder, meta: { touched, error }, ...props }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  return (
    <FormItem
      label={label}
      validateStatus={validateStatus}
      help={touched && error}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      placeholder={placeholder || label}
    >
      <ADAutoComplete {...props}>{children}</ADAutoComplete>
    </FormItem>
  );
};

RenderAutoComplete.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  icon: PropTypes.node
};
export default RenderAutoComplete;
