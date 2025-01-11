import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>WELLCOME TO TODO APP</h1>
        </header>
        
    
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

const LandingPage = () => {
  return (
    <div>
          <div className="landing-buttons">
        <Link to="/login" className="button">Login</Link>
        <Link to="/signup" className="button">Sign Up</Link>
      </div>
  

    </div>
      );
};

export default App;