import styled from 'styled-components';
import { Button as Btn } from 'antd';
import { Button } from '@gqlapp/look-client-react';
import { Link } from 'react-router-dom';
// import { Button } from 'antd';

const PgTitle = styled.div`
  font-weight: bold;
  font-size: 35px;
  line-height: 42px;
  color: #222222;
`;

const Text = styled.span`
  font-family: Metropolis, QuickSand;
  font-size: 14px;
  line-height: 25px;
  padding-right: 10px;
  color: #9b9b9b;
`;

// Button component
const SubmitBtn = styled(Button)`
  height: 48px;
`;

// Link component

const LinkGrey = styled(Link)`
  font-size: 14px;
  color: #9b9b9b;
`;

const LinkTo = styled(Link)`
  font-size: 14px;
  line-height: 20px;

  color: #222222;
`;

const StatusText = styled.div`
  color: ${props => props.status === 'Delivered' && '#2aa952'};
  color: ${props => props.status === 'Processing' && '#F79E1B'};
  color: ${props => props.status === 'Cancelled' && 'red'};
`;

const Divider = styled.div`
  margin: 16px 0px 16px 0px;
  width: 100%;
  opacity: 0.25;
  border: 0.4px solid #9b9b9b;
`;

const DropDownButton = styled(Btn)`
  /* &:hover {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, #fc4c4c 77.6%);
  } */
  color: #222222;
`;

export {
  PgTitle,
  Text,
  // Button component
  SubmitBtn,
  // Link component
  LinkTo,
  LinkGrey,
  StatusText,
  Divider,
  DropDownButton
};
