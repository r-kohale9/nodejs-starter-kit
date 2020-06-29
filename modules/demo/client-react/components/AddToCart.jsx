import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const Fixed = styled.div`
  width: 100%;

  position: fixed;
  bottom: 0px;
  z-index: 1000;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
`;

const AddToCart = props => {
  const { onSubmit, disabled } = props;
  return (
    <Fixed>
      <Button type="primary" size="lg" block onClick={onSubmit} disabled={disabled}>
        <strong>ADD TO CART</strong>
      </Button>
    </Fixed>
  );
};

AddToCart.propTypes = {
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool
};
export default AddToCart;
