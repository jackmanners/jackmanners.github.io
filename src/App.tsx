import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

// Redirect component
const ExternalRedirect = ({ url }: { url: string }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/projects" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
        <Route path="/projects/undermattressvalidation" element={<ExternalRedirect url="https://researchnow.flinders.edu.au/en/persons/jack-manners" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
