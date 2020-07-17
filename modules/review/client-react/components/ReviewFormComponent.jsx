import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Card, Rate } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { RenderField, RenderUploadMultiple, Button } from '@gqlapp/look-client-react';

import UserAutoCompleteComponent from './UserAutoCompleteComponent';

const ReviewFormSchema = { rating: [required], feedback: [required] };

const ReviewFormComponent = props => {
  const { dirty, cardTitle, values, onSearchTextChange, handleSubmit, setFieldValue } = props;
  const [load, setLoad] = useState(true);

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
          <UserAutoCompleteComponent
            name="username"
            label="username"
            userType="user"
            value={values.userId}
            setValue={e => setFieldValue('userId', e)}
            onSearchTextChange={onSearchTextChange}
          />
          <UserAutoCompleteComponent
            name="baker"
            label="baker"
            userType="baker"
            value={values.bakerId}
            setValue={e => setFieldValue('bakerId', e)}
            onSearchTextChange={onSearchTextChange}
          />
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
      bakerId: (props.review && props.review.baker && props.review.baker.id) || null,
      userId: (props.review && props.review.user && props.review.user.id) || null,
      rating: (props.review && props.review.rating) || null,
      feedback: (props.review && props.review.feedback) || '',
      reviewImages:
        props.review && props.review.reviewImages && props.review.reviewImages.length !== 0
          ? props.review.reviewImages.map(getImg)
          : []
    };
  },
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
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
