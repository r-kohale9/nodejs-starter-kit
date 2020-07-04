import React from 'react';

import SettingsView from '../components/SettingsView';
import { PERSONAL_INFO } from './Data';

const Settings = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };

  return <SettingsView {...props} personalInfo={PERSONAL_INFO} onSubmit={handleSubmit} />;
};

export default Settings;
