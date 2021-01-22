import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import {
  Row,
  Col,
  Button,
  RenderCheckBox,
  Option,
  // RenderUpload,
  RenderSelect,
  // Icon,
  Card,
  RenderField,
  Form,
} from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

const SubjectFormSchema = {
  title: [required],
};

const SubjectFormComponent = (props) => {
  const { cardTitle, handleSubmit, values, t } = props;
  const [load, setLoad] = useState(false);

  // console.log('props form component', props.values.imageUrl);
  return (
    <Card
      title={
        <>
          <h3>
            {/* <Icon type="SolutionOutlined" /> */}
            &nbsp;
            <strong>{cardTitle}</strong>
          </h3>
          <div align="center">
            <div key="line" className="title-line-wrapper" align="left">
              <div
                className="title-line"
                // style={{ transform: "translateX(-64px)" }}
              />
            </div>
          </div>
        </>
      }
    >
      {/* {console.log(values)} */}
      <Form onSubmit={handleSubmit} align="left">
        <Row type="flex" gutter={24}>
          <Col md={12} xs={24} align="left">
            <Field
              name="title"
              icon="FontSizeOutlined"
              component={RenderField}
              placeholder={t('subjectForm.title')}
              type="text"
              label={t('subjectForm.title')}
              value={values.title}
            />
          </Col>
          <Col md={12} xs={24} align="left"></Col>
          <Col md={12} xs={24} align="left">
            <Field
              name="description"
              icon="FileOutlined"
              component={RenderField}
              placeholder={t('subjectForm.description')}
              type="textarea"
              label={t('subjectForm.description')}
              value={values.description}
            />
          </Col>
          <Col md={12} xs={24} align="left">
            <Row type="flex">
              <Col md={12} xs={24} align="left">
                <Field
                  name="isActive"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={t('subjectForm.isActive')}
                  checked={values.isActive}
                />
              </Col>
              <Col md={12} xs={24} align="left"></Col>
            </Row>
          </Col>
          <Col span={24} align="right">
            <Button color="primary" type="submit" disabled={load}>
              {t('subjectForm.btn.submit')}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

SubjectFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  t: PropTypes.func,
  cardTitle: PropTypes.string,
  showAdditional: PropTypes.bool,
};

const SubjectWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      id: (props.subject && props.subject.id) || null,
      title: (props.subject && props.subject.title) || '',
      description: (props.subject && props.subject.description) || '',
      isActive: props.listing && (props.listing.isActive ? true : false),
      // subCategories: (props.subject && props.subject.subCategories) || [],
    };
  },
  async handleSubmit(
    values,
    {
      props: { onSubmit },
    }
  ) {
    await onSubmit(values);
  },
  validate: (values) => validate(values, SubjectFormSchema),
  displayName: 'Subject Form', // helps with React DevTools
});

export default SubjectWithFormik(SubjectFormComponent);
