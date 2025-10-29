import React from 'react';
import RegistrationForm from './RegistrationForm';

const UX: React.FC = () => {
  return (
    <div>
      <RegistrationForm 
        title="UI/UX"
        domain="UI/UX"
        endpoint="/api/UX"
        maxTeamSize={3}
      />
    </div>
  );
};

export default UX;
