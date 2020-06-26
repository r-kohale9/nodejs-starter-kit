import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Row, Col, Button, Icon, List, Rate } from 'antd';
import styled from 'styled-components';
import { withFormik } from 'formik';

import { RenderField, RenderUpload } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

import ModalComponent from './ModalComponent';
import Pen from '../Icons/pen.svg';

const ReviewBtn = styled(Button)`
  box-shadow: 0px 4px 8px rgba(211, 38, 38, 0.25);
  border-radius: 25px;
  height: 36px;
`;

const SendReviewBtn = styled(Button)`
  box-shadow: 0px 4px 8px rgba(211, 38, 38, 0.25);
  border-radius: 25px;
  height: 48px;
`;

const WriteReviewComponentFormSchema = {
  review: [required]
};

const WriteReviewComponent = props => {
  const { values, handleSubmit } = props;
  const [load, setLoad] = useState(true);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ReviewBtn type="danger" block onClick={() => setVisible(true)}>
        <img alt="" src={Pen} style={{ paddingRight: '5px' }} /> Write a review
      </ReviewBtn>
      <ModalComponent
        title="What is your rate?"
        // visible={true}
        visible={visible}
        handleVisible={() => setVisible(false)}
      >
        <Col span={24}>
          <Rate allowHalf style={{ fontSize: '50px' }} />
        </Col>
        <Col span={24}>
          <h3>Please share your opinion about the product</h3>
        </Col>
        <Col span={24}>
          <Form onSubmit={handleSubmit}>
            <Field
              name="review"
              component={RenderField}
              placeholder="Your review"
              type="textarea"
              value={values.review}
            />
            {/* <Field
              name="images"
              component={RenderUpload}
              type="text"
              setload={setLoad}
              label="Add photo"
              value={values.images}
              // style={{ display: 'inline-block', margin: '0px 5px' }}
            /> */}
          </Form>
        </Col>
        <Col span={24}>
          <div style={{ padding: '15px 0px' }}>
            <SendReviewBtn type="danger" block onClick={() => handleSubmit(values)}>
              SEND REVIEW
            </SendReviewBtn>
          </div>
        </Col>
      </ModalComponent>
    </>
  );
};

WriteReviewComponent.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.array,
  info: PropTypes.string
};

const WriteReviewComponentWithFormik = withFormik({
  mapPropsToValues: () => {
    return {
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
