import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Col, Button, Rate } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { RenderField, RenderUploadMultiple } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

import ModalComponent from './ModalComponent';

const WriteReviewComponentFormSchema = {
  rating: [required],
  feedback: [required]
};

const WriteReviewComponent = props => {
  const { values, handleSubmit, dirty, setFieldValue, renderBtn } = props;
  const [load, setLoad] = useState(true);
  const [visible, setVisible] = useState(false);
  console.log('props', props, load && !dirty);

  return (
    <>
      {renderBtn(() => setVisible(true))}
      <ModalComponent
        title="What is your rating?"
        // visible={true}
        visible={visible}
        handleVisible={() => setVisible(false)}
      >
        <Col span={24}>
          <Rate
            allowHalf
            defaultValue={values.rating}
            style={{ fontSize: '50px' }}
            onChange={e => setFieldValue('rating', Number(e))}
          />
        </Col>
        <Col span={24}>
          <h3>Please share your opinion about the product</h3>
        </Col>
        <Col span={24}>
          <Form onSubmit={handleSubmit}>
            <div style={{ paddingTop: '15px' }}>
              <Field
                name="feedback"
                component={RenderField}
                placeholder="Your review"
                type="textarea"
                value={values.feedback}
              />
            </div>
            <FieldArray
              name="reviewImages"
              label={'Add photo'}
              render={arrayHelpers => (
                <RenderUploadMultiple
                  setload={load => setLoad(load)}
                  arrayHelpers={arrayHelpers}
                  values={values.reviewImages}
                  dictKey="imageUrl"
                />
              )}
            />
          </Form>
        </Col>
        <Col span={24}>
          <div style={{ padding: '15px 0px' }}>
            <Button type="primary" size="lg" block onClick={() => handleSubmit(values)} disabled={load && !dirty}>
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
  dirty: PropTypes.bool
};

const WriteReviewComponentWithFormik = withFormik({
  mapPropsToValues: props => {
    function getImg(Img) {
      return {
        id: Img.id,
        imageUrl: Img.imageUrl
      };
    }
    return {
      id: (props.review && props.review.id) || null,
      userId: (props.review && props.review.userId) || null,
      rating: (props.review && props.review.rating) || null,
      feedback: (props.review && props.review.feedback) || '',
      reviewImages:
        props.review && props.review.reviewImages && props.review.reviewImages.length !== 0
          ? props.review.reviewImages.map(getImg)
          : []
    };
  },
  async handleSubmit(values, { setErrors, props: { onSubmit, type } }) {
    await onSubmit(values, type);
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
