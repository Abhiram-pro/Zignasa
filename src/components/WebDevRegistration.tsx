import React from 'react';
import RegistrationForm from './RegistrationForm';
import Dither from './Dither';

const WebDevRegistration: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Dither Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0, 
        pointerEvents: 'none', 
        opacity: 0.5,
        overflow: 'hidden'
      }}>
        <Dither
          waveColor={[0.4, 0.2, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={0.3}
          colorNum={3}
          waveAmplitude={0.28}
          waveFrequency={2}
          waveSpeed={0.04}
        />
      </div>

      <div className="relative z-10">
        <RegistrationForm 
          title="Web Development"
          domain="Web Dev"
          endpoint="/api/webdev"
        />
      </div>
    </div>
  );
};

export default WebDevRegistration;
