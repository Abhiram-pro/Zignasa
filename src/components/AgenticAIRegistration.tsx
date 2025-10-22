import React from 'react';
import RegistrationForm from './RegistrationForm';

const AgenticAIRegistration: React.FC = () => {
  return (
    <div>
      <RegistrationForm 
        title="Agentic AI Development"
        domain="Agentic AI"
        endpoint="/api/AgenticAI"
      />
    </div>
  );
};

export default AgenticAIRegistration;
