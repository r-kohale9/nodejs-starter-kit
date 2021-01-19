import React from "react";
import PropTypes from "prop-types";
import { withFormik, FieldArray } from "formik";
import { isEmpty } from "lodash";

import { isFormError, FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { translate } from "@gqlapp/i18n-client-react";
import {
  email,
  minLength,
  required,
  match,
  validate,
} from "@gqlapp/validation-common-react";
import {
  Form,
  RenderField,
  RenderSelect,
  RenderCheckBox,
  Option,
  Button,
  Alert,
  RenderUpload,
  // RenderDynamicField
} from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";

const questionFormSchema = {
  description: [required, minLength(3)],
  // email: [required, email]
};

const UserForm = ({
  values,
  handleSubmit,
  errors,
  setFieldValue,
  t,
  shouldDisplayRole,

  shouldDisplayActive,
}) => {
  const { description, isActive, choices, questionType } = values;
  const [load, setload] = React.useState(false);
  console.log("userFormValues", values);
  return (
    <Form name="description" onSubmit={handleSubmit}>
      <Field
        name="description"
        component={RenderField}
        type="text"
        label="Description"
        value={description}
      />
      <Field
        name="isActive"
        component={RenderCheckBox}
        type="checkbox"
        label={t("userEdit.form.field.active")}
        checked={isActive}
      />
      <Field
        name="questionType"
        component={RenderSelect}
        type="select"
        label="Question Type"
        value={questionType}
      >
        <Option value="user">skdlfj</Option>
        <Option value="admin">sdaf</Option>
      </Field>

      {errors && errors.errorMsg && (
        <Alert color="error">{errors.errorMsg}</Alert>
      )}
      <Button color="primary" type="submit">
        {t("userEdit.form.btnSubmit")}
      </Button>
    </Form>
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  onSubmit: PropTypes.func,
  setTouched: PropTypes.func,
  isValid: PropTypes.bool,
  shouldDisplayRole: PropTypes.bool,
  shouldDisplayActive: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  initialValues: PropTypes.object.isRequired,
  touched: PropTypes.object,
  t: PropTypes.func,
};

const UserFormWithFormik = withFormik({
  mapPropsToValues: ({ initialValues }) => {
    function getChoice(choice) {
      return {
        description: (choice && choice.description) || "",
        questionId: (choice && choice.questionId) || null,
      };
    }
    return {
      description: (initialValues && initialValues.description) || "",
      isActive: initialValues && initialValues.isActive,
      choices:
        (initialValues &&
          initialValues.choices &&
          initialValues.choices.map(getChoice)) ||
        [],
      questionType: (initialValues && initialValues.questionType) || "",
    };
  },
  async handleSubmit(
    values,
    {
      setErrors,
      props: { onSubmit },
    }
  ) {
    await onSubmit(values).catch((e) => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  displayName: "SignUpForm ", // helps with React DevTools
  validate: (values, props) => validate(values, questionFormSchema),
});

export default translate("user")(UserFormWithFormik(UserForm));
