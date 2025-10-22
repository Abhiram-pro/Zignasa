import React from 'react';
import RegistrationForm from './RegistrationForm';

const DataScienceRegistration: React.FC = () => {
  return (
    <div>
      <RegistrationForm 
        title="Data Science With Cloud"
        domain="Web Dev"
        endpoint="/api/ds"
      />
    </div>
  );
};

export default DataScienceRegistration;
