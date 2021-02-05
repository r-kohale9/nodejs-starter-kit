import React from 'react';
import { withFormik, FormikProps } from 'formik';

import { Form, RenderField, Card, Button, Message } from '@gqlapp/look-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';

// types
import { SocialSharingButtonsProps } from './SocialSharingButtons';

const MailButtonFormSchema = {
  email: [required]
};

export interface MailButtonFormValues {
  email: string;
  number: number;
}

export interface MailButtonFormProps extends SocialSharingButtonsProps {
  submitting?: boolean;
  hideModal?: () => void;
}

const MailButtonForm: React.FC<MailButtonFormProps & FormikProps<MailButtonFormValues>> = props => {
  const inputForm = 'email';
  const { values, handleSubmit, submitting, whatsappMessage, t, hideModal } = props;
  const handleForm = () => {
    handleSubmit();
    hideModal();
  };
  return (
    <Form onSubmit={handleSubmit} name="invite" onShare={handleForm}>
      {inputForm === 'email' ? (
        <Field
          name="email"
          component={RenderField}
          type="email"
          placeholder={t('socialSharingButton.email')}
          label={t('socialSharingButton.email')}
          value={values.email}
        />
      ) : (
        <Field
          name="number"
          component={RenderField}
          type="number"
          placeholder={t('socialSharingButton.number')}
          label={t('socialSharingButton.number')}
          value={values.number}
        />
      )}
      <h3>{t('socialSharingButton.text')}</h3>
      <br />
      <Card>{whatsappMessage}</Card>
      <br />
      <Button disabled={submitting} color="primary" type="submit" block>
        {t('socialSharingButton.btn.share')}
      </Button>
    </Form>
  );
};

const MailButtonFormWithFormik = withFormik<MailButtonFormProps, MailButtonFormValues>({
  mapPropsToValues: () => ({
    email: '',
    number: 0
  }),
  validate: values => validate(values, MailButtonFormSchema),
  async handleSubmit(values, { props: { onShare, emailMessage } }) {
    if (!values.number && !values.email) {
      Message.warn('No One to Share with!');
    }

    if (values.number) {
      const x = values.number.toString();
      x.length >= 10 ? Message.warn('Function not defined yet!') : Message.warn('Enter a valid Phone Number');
    }

    if (values.email) {
      // delete values["inviteVal"];
      onShare({ email: values.email, message: emailMessage });
      Message.warn('Sending email!');
    }
    // console.log(values);
  },
  enableReinitialize: true,
  displayName: 'ShareForm' // helps with React DevTools
});

export default MailButtonFormWithFormik(MailButtonForm);
