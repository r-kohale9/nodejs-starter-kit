import React from 'react';

import SettingsView from '../components/SettingsView';

const PERSONAL_INFO = {
  id: 1,
  fullName: 'Katrina',
  dateOfBirth: '12/12/1989'
};

const Settings = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };

  return <SettingsView {...props} personalInfo={PERSONAL_INFO} onSubmit={handleSubmit} />;
};

export default Settings;
