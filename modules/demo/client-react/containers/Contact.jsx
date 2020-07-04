import React from 'react';

import ContactView from '../components/ContactView';
import { USER, ADDRESS } from './Data';

const Contact = props => {
  return <ContactView {...props} user={USER} address={ADDRESS} />;
};

export default Contact;
