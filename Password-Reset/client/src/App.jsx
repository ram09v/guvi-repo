import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/forgot-password" replace />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword/:resetToken" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;