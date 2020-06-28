import styled from 'styled-components';
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
  font-size: 16px;
  line-height: 25px;
  padding-right: 10px;
  color: #9b9b9b;
`;

// Button component
const SubmitBtn = styled(Button)`
  height: 48px;
`;

// Link component
const LinkBold = styled(Link)`
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;

  color: #222222;
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

export {
  PgTitle,
  Text,
  // Button component
  SubmitBtn,
  // Link component
  LinkBold,
  LinkTo,
  StatusText
};
