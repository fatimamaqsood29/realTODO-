import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import TodoList from "./Components/TodoList";
import "./App.css";

const App = () => {
  // Simulate user authentication status
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>WELCOME TO TODO APP</h1>
        </header>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Route */}
          <Route
            path="/todolist"
            element={isAuthenticated ? <TodoList /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

// Landing Page with navigation links
const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-buttons">
        <Link to="/login" className="button">
          Login
        </Link>
        <Link to="/signup" className="button">
          Sign Up
        </Link>
        {/* <Link to="/todolist" className="button">
          Todo List
        </Link> */}
      </div>
    </div>
  );
};

export default App;