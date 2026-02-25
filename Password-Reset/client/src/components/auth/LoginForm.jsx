import React from 'react';
import { LogIn, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginForm = ({ email, setEmail, password, setPassword, onSubmit, loading }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
      
      <div className="text-center mb-8">
        <div className="bg-indigo-50 w-12 h-12 rounded-full flex mx-auto mb-4 items-center justify-center">
          <LogIn className="text-indigo-600 w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
        <p className="text-slate-500 mt-2 text-sm">Sign in to your account to continue.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
          </div>
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg flex justify-center items-center gap-2 mt-2 disabled:opacity-70 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>

    </div>
  </div>
);

export default LoginForm;