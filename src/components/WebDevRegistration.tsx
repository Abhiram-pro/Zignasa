import React from 'react';
import RegistrationForm from './RegistrationForm';

const WebDevRegistration: React.FC = () => {
  return (
    <div>
      <RegistrationForm 
        title="Web Development"
        domain="Web Dev"
        endpoint="/api/webdev"
      />
    </div>
  );
};

export default WebDevRegistration;
