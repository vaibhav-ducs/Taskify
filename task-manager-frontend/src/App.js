// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Login from './components/Login/Login';
import TaskManager from './components/TaskHandler/TaskManager'
// import SignupDialog from './components/Signup/SignupDialog';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login open />} /> {/* Standalone Login page */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login open />} /> {/* Default route to Login */}
          <Route
            path="/taskmanager"
            element={isAuthenticated ? <TaskManager /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
