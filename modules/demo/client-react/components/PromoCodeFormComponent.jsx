import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Card, Rate } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';
import { RenderField, RenderUpload, Button } from '@gqlapp/look-client-react';

const PromoCodeFormSchema = { title: [required], validity: [required], promoCode: [required] };

const PromoCodeFormComponent = props => {
  const [load, setLoad] = useState(true);
  const { dirty, cardTitle, values, handleSubmit } = props;
  console.log('props', props.values);
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
          <Field name="title" component={RenderField} placeholder="Title" type="text" value={values.title} />
          <Field name="validity" component={RenderField} placeholder="Validity" type="number" value={values.validity} />
          <Field
            name="promoCode"
            component={RenderField}
            placeholder="Promo Code"
            type="text"
            value={values.promoCode}
          />
          <Field
            name="imageUrl"
            component={RenderUpload}
            type="text"
            setload={load => setLoad(load)}
            value={values.imageUrl}
            // style={{ display: 'inline-block', margin: '0px 5px' }}
          />
        </div>
        <Button color="primary" type="submit" disabled={load && !dirty}>
          Submit
        </Button>
      </Form>
    </Card>
  );
};

PromoCodeFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  t: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object
};

const PromoCodeWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      id: (props.promoCode && props.promoCode.id) || null,
      title: (props.promoCode && props.promoCode.title) || '',
      validity: (props.promoCode && props.promoCode.validity) || null,
      promoCode: (props.promoCode && props.promoCode.promoCode) || '',
      imageUrl: (props.promoCode && props.promoCode.imageUrl) || ''
    };
  },
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    console.log('on submit called', values);
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, PromoCodeFormSchema),
  displayName: 'PromoCode Form' // helps with React DevTools
});

export default PromoCodeWithFormik(PromoCodeFormComponent);
