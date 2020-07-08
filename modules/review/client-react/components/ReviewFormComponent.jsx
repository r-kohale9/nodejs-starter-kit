import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Card, Rate } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';
import { RenderField, RenderUploadMultiple, Button } from '@gqlapp/look-client-react';

const ReviewFormSchema = { rating: [required], feedback: [required] };

const ReviewFormComponent = props => {
  const [load, setLoad] = useState(true);
  const { dirty, cardTitle, values, handleSubmit, setFieldValue } = props;
  console.log('props', props, load && !dirty);
  return (
    <Card
      title={
        <h1>
          <strong>{cardTitle}</strong>
        </h1>
      }
    >
      <Form onSubmit={handleSubmit}>
        <div style={{ paddingTop: '15px' }}>
          <Rate
            allowHalf
            defaultValue={Number(values.rating)}
            style={{ fontSize: '50px' }}
            onChange={e => setFieldValue('rating', Number(e))}
          />
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
        <Button color="primary" type="submit" disabled={load && !dirty}>
          Submit
        </Button>
      </Form>
    </Card>
  );
};

ReviewFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  t: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object
};

const ReviewWithFormik = withFormik({
  enableReinitialize: true,
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
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    console.log('on submit called');
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, ReviewFormSchema),
  displayName: 'Review Form' // helps with React DevTools
});

export default ReviewWithFormik(ReviewFormComponent);
