import React, { useState } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/forgotpassword', { email });
      toast.success(response.data.message || 'Reset link sent to your email!');
      setEmail('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to connect to the server. Error sending email';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgotPasswordForm 
      email={email} 
      setEmail={setEmail} 
      onSubmit={handleSubmit} 
      loading={loading} 
    />
  );
};

export default ForgotPasswordPage;