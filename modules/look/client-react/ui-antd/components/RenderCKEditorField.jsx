import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";
import CKEditor from "ckeditor4-react";

const FormItem = Form.Item;

const RenderField = (props) => {
  const [mounted, setMounted] = useState(false);
  const ckeditorRef = useRef(null);
  useEffect(() => {
    setMounted(true);
  });
  const {
    input,
    label,
    type,
    meta: { touched, error },
    placeholder,
    value,
    name,
    formik: { setFieldValue },
  } = props;
  let validateStatus = "";
  if (touched && error) {
    validateStatus = "error";
  }

  const changeHandler = (e) => {
    setFieldValue(name, e && e.editor && e.editor.getData());
  };
  return (
    <FormItem
      label={label}
      validateStatus={validateStatus}
      help={touched && error}
    >
      <div>
        {mounted && (
          <CKEditor
            ref={ckeditorRef}
            mode="wysiwyg"
            data={value}
            onChange={changeHandler}
          />
        )}
      </div>
    </FormItem>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};

export default RenderField;
