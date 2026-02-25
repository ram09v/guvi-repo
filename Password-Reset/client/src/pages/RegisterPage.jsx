import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const response = await api.post('/register', { username, email, password });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Registration Successful!');
        navigate('/dashboard');
      } else {
        toast.success('Account created! Please log in.');
        navigate('/login');
      }
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm 
      username={username} setUsername={setUsername}
      email={email} setEmail={setEmail}
      password={password} setPassword={setPassword}
      confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
      onSubmit={handleSubmit} loading={loading}
    />
  );
};

export default RegisterPage;