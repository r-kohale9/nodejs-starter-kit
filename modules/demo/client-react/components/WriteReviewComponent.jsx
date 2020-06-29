import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Col, Button, Rate } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { RenderField, RenderUploadMultiple } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

import ModalComponent from './ModalComponent';
import Pen from '../Icons/pen.svg';

const WriteReviewComponentFormSchema = {
  rate: [required],
  review: [required]
};

const WriteReviewComponent = props => {
  const { values, handleSubmit, isValid, setFieldValue } = props;
  const [load, setLoad] = useState(true);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" block onClick={() => setVisible(true)}>
        <img alt="" src={Pen} style={{ paddingRight: '5px' }} /> Write a review
      </Button>
      <ModalComponent
        title="What is your rate?"
        // visible={true}
        visible={visible}
        handleVisible={() => setVisible(false)}
      >
        <Col span={24}>
          <Rate allowHalf style={{ fontSize: '50px' }} onChange={e => setFieldValue('rate', e)} />
        </Col>
        <Col span={24}>
          <h3>Please share your opinion about the product</h3>
        </Col>
        <Col span={24}>
          <Form onSubmit={handleSubmit}>
            <div style={{ paddingTop: '15px' }}>
              <Field
                name="review"
                component={RenderField}
                placeholder="Your review"
                type="textarea"
                value={values.review}
              />
            </div>
            <FieldArray
              name="images"
              label={'Add photo'}
              render={arrayHelpers => (
                <RenderUploadMultiple
                  setload={load => setLoad(load)}
                  arrayHelpers={arrayHelpers}
                  values={values.images}
                  dictKey="imageUrl"
                />
              )}
            />
          </Form>
        </Col>
        <Col span={24}>
          <div style={{ padding: '15px 0px' }}>
            <Button type="primary" size="lg" block onClick={() => handleSubmit(values)} disabled={load && isValid}>
              <strong>SEND REVIEW</strong>
            </Button>
          </div>
        </Col>
      </ModalComponent>
    </>
  );
};

WriteReviewComponent.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool
};

const WriteReviewComponentWithFormik = withFormik({
  mapPropsToValues: () => {
    return {
      rate: null,
      review: '',
      images: []
    };
  },
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    await onSubmit(values);
    // .catch(e => {
    //   if (isFormError(e)) {
    //     setErrors(e.errors);
    //   } else {
    //     throw e;
    //   }
    // });
  },
  validate: values => validate(values, WriteReviewComponentFormSchema),
  displayName: 'WriteReviewComponent Form' // helps with React DevTools
});
export default WriteReviewComponentWithFormik(WriteReviewComponent);
