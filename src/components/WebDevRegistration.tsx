import React from 'react';
import RegistrationForm from './RegistrationForm';

const WebDevRegistration: React.FC = () => {
  return (
    <div>
      <RegistrationForm 
        title="Web Development Using AI"
        domain="webdev"
        endpoint="/api/webdev"
      />
    </div>
  );
};

export default WebDevRegistration;
