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
      await api.post('/forgotpassword', { email });
      toast.success('Reset link sent to your email!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending email');
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