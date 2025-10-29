import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Home from './components/Home';
import Domains from './components/Domains';
import AgenticAIRegistration from './components/AgenticAIRegistration';
import WebDevRegistration from './components/WebDevRegistration';
import UX from './components/UX';
import PaymentConfirmation from './components/PaymentConfirmation';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/AgenticAI" element={<AgenticAIRegistration />} />
          <Route path="/webdev" element={<WebDevRegistration />} />
          <Route path="/UX" element={<UX />} />
          <Route path="/confirmation" element={<PaymentConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;