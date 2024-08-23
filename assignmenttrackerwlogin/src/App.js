import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Nav from './Nav';
import Exam from './Exam';
import Schedule from './Schedule';

function App() {
  return (
    <div className="App">
      <Router>
        <RouteChangeDetector />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assignments" element={<Tasks />} />
          <Route path='/exams' element={<Exam />} />
          <Route path='/examschedule' element={<Schedule />} />
        </Routes>
      </Router>
    </div>
  );
}

const RouteChangeDetector = () => {
  const location = useLocation();
    
    // Hides Navbar when path is the login page
  if (location.pathname === '/') {
    return null;
  }
  
  return <Nav />;
}


export default App;
