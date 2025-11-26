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
import OpenChallenge from './components/OpenChallenge';
import ProblemStatements from './components/ProblemStatements';
import ProblemStatementDetail from './components/ProblemStatementDetail';

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
          <Route path="/open-challenge" element={<OpenChallenge />} />
          <Route path="/problem-statements" element={<ProblemStatements />} />
          <Route path="/problem-statements/:domain" element={<ProblemStatementDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;