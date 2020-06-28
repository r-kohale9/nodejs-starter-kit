import styled from 'styled-components';
import { Button } from '@gqlapp/look-client-react';
import { Link } from 'react-router-dom';
// import { Button } from 'antd';

const PgTitle = styled.div`
  font-weight: bold;
  font-size: 35px;
  line-height: 42px;
  margin-bottom: 80px;
  color: #222222;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #222222;
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

export {
  PgTitle,
  Text,
  // Button component
  SubmitBtn,
  // Link component
  LinkBold,
  LinkTo
};
