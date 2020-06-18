import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const Fixed = styled.div`
  width: 100%;

  position: fixed;
  bottom: 0px;
  z-index: 1000;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
`;

const AddToCartbtn = styled(Button)`
  height: 48px;
  box-shadow: 0px 4px 8px rgba(211, 38, 38, 0.25);
  border-radius: 25px;
`;

const AddToCart = props => {
  return (
    <Fixed>
      <AddToCartbtn type="danger" block>
        ADD TO CART
      </AddToCartbtn>
    </Fixed>
  );
};

export default AddToCart;
