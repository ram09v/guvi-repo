import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/currentUser');
        setUser(data.data);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <button onClick={handleLogout} className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg font-medium transition-colors">Logout</button>
        </div>
        <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-lg">
          <h2 className="text-xl font-semibold text-indigo-900 mb-1">Welcome back, {user.username}!</h2>
          <p className="text-indigo-700">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;