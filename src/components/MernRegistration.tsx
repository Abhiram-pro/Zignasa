import React from 'react';
import RegistrationForm from './RegistrationForm';

const MernRegistration: React.FC = () => {
  return (
    <div>
      <RegistrationForm 
        title="Full Stack Development Using MERN"
        domain="mern"
        endpoint="/api/mern"
      />
    </div>
  );
};

export default MernRegistration;
