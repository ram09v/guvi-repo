import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import StatusMessage from '../components/ui/StatusMessage';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);
  
  const { resetToken } = useParams();
  const hasCheckedToken = useRef(false);

  useEffect(() => {
    if (hasCheckedToken.current) return;
    
    const checkToken = async () => {
      try {
        await api.get(`/resetpassword/${resetToken}`);
        setTokenValid(true);
      } catch (error) {
        setTokenValid(false);
      }
    };

    if (resetToken) {
      hasCheckedToken.current = true;
      checkToken();
    }
  }, [resetToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    
    setLoading(true);
    try {
      await api.put(`/resetpassword/${resetToken}`, { password });
      toast.success('Password reset successfully!');
      setSuccess(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);

      if (errorMessage.toLowerCase().includes('token')) {
        setTokenValid(false);
      } else {
        setPassword('');
        setConfirmPassword('');
      }
    } finally {
      setLoading(false);
    }
  };

  if (tokenValid === null) {
    return <LoadingSpinner />;
  }
  
  if (tokenValid === false) {
    return (
      <StatusMessage 
        type="error"
        title="Invalid or Expired Token"
        message="This password reset link is invalid or has expired. Please request a new one."
        linkTo="/forgot-password"
        linkText="Go Back to Forgot Password"
      />
    );
  }

  if (success) {
    return (
      <StatusMessage 
        type="success"
        title="Password Updated"
        message="Your password has been successfully updated."
        linkTo="/login"
        linkText="Go to Login"
      />
    );
  }

  return (
    <ResetPasswordForm 
      password={password} setPassword={setPassword}
      confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
      onSubmit={handleSubmit} loading={loading}
    />
  );
};

export default ResetPasswordPage;