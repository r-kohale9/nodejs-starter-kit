import React from 'react';
import { PropTypes } from 'prop-types';
import { List, Row, Col, Button } from 'antd';
import { withFormik } from 'formik';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';

import { RenderCheckBox } from '@gqlapp/look-client-react';

import AddressCardComponent from './AddressCardComponent';

const RenderAddress = props => {
  const { addresses, values, history } = props;
  // const [visible, setVisible] = useState(addresses.map(() => false));

  // const handleShippingAddress = index => {
  //   values.addresses.map(address => (address.shippingAddress = false));
  //   console.log('index', values.addresses);
  //   values.addresses[index].shippingAddress = true;
  // };

  return (
    <Row>
      <Col span={24}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3
          }}
          dataSource={addresses && addresses.length !== 0 && addresses}
          renderItem={(address, index) => (
            <List.Item>
              <AddressCardComponent
                address={address}
                index={index}
                btnTitle="Edit"
                handleBtn={() => history.push(`/demo/edit-shipping-address/${address.id}`)}
                extra={
                  <Field
                    name={`addresses[${index}].shippingAddress`}
                    component={RenderCheckBox}
                    labelText="Use as the shipping address"
                    // onChange={() => handleShippingAddress(index)}
                    checked={values.addresses[index].shippingAddress}
                  />
                }
              />
            </List.Item>
          )}
        />
      </Col>
      {/* <div style={{ padding: '24px 0px 50px 0px', width: '100%' }}> */}
      <Col span={24}>
        <Row type="flex" justify="end">
          <Button shape="circle" icon="plus" type="black" onClick={() => history.push('/demo/add-shipping-address')} />
        </Row>
      </Col>
      {/* </div> */}
    </Row>
  );
};

RenderAddress.propTypes = {
  addresses: PropTypes.array,
  values: PropTypes.object,
  history: PropTypes.object
};

const RenderAddressWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: values => {
    const { addresses } = values;
    function getAddresses(address) {
      return {
        shippingAddress: address.shippingAddress
      };
    }

    return {
      addresses: addresses && addresses.length !== 0 ? addresses.map(getAddresses) : []
    };
  },
  async handleSubmit(
    values // , { props: { addOrEditAddresses } }
  ) {
    console.log('values', values);
    // try {
    //   await addOrEditAddresses(values);
    // } catch (e) {
    //   console.log(e);
    // }
  },
  displayName: 'RenderAddress ' // helps with React DevTools
});

export default RenderAddressWithFormik(RenderAddress);
