import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Home from './components/Home';
import Domains from './components/Domains';
import DataScienceRegistration from './components/DataScienceRegistration';
import MernRegistration from './components/MernRegistration';
import WebDevRegistration from './components/WebDevRegistration';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/ds" element={<DataScienceRegistration />} />
          <Route path="/mern" element={<MernRegistration />} />
          <Route path="/webdev" element={<WebDevRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;