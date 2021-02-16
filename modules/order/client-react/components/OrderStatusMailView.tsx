import React from 'react';
import { withFormik, FormikProps } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Form, Icon, RenderField, ModalDrawer, Button, Col } from '@gqlapp/look-client-react';
import { displayDataCheck } from '@gqlapp/listing-client-react';

interface OrderStatusMailFormValues {
  note: string;
}
interface OrderStatusMailFormProps {
  onSubmit: (orderId: number, note: string) => void;
  orderId: number;
  disabled: boolean;
}
interface StatusMailFormProps {
  values: OrderStatusMailFormValues;
  handleSubmit: () => void;
  hideModal?: () => void;
}

const OrderStatusMailView: React.FC<OrderStatusMailFormProps & FormikProps<OrderStatusMailFormValues>> = props => {
  const { disabled = false } = props;
  return (
    <>
      <ModalDrawer
        buttonText={
          <>
            <Icon type="MailOutlined" />
          </>
        }
        shape="circle"
        size="sm"
        modalTitle={`Mail details for order id: ${displayDataCheck(props.orderId)}`}
        height="auto"
        block={false}
        disabled={disabled}
      >
        <StatusMailForm {...props} />
      </ModalDrawer>
    </>
  );
};

const StatusMailForm: React.FC<StatusMailFormProps> = props => {
  const { values, handleSubmit, hideModal } = props;
  const handleOnSubmit = () => {
    handleSubmit();
    hideModal();
  };
  return (
    <Form onSubmit={handleOnSubmit}>
      <Field
        name="note"
        component={RenderField}
        placeholder="Note"
        type="textarea"
        label="Extra note"
        value={values.note}
      />
      <div align="right">
        <Col lg={4} md={5} sm={24} xs={24}>
          <Button color="primary" type="submit" block>
            Submit
          </Button>
        </Col>
      </div>
    </Form>
  );
};

const OrderStatusMailWithFormik = withFormik<OrderStatusMailFormProps, OrderStatusMailFormValues>({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    note: ''
  }),
  async handleSubmit(values, { props: { onSubmit, orderId } }) {
    // console.log('on submit called', values);
    await onSubmit(orderId, values.note);
  },
  displayName: 'OrderStatusMail Form' // helps with React DevTools
});
export default OrderStatusMailWithFormik(OrderStatusMailView);
