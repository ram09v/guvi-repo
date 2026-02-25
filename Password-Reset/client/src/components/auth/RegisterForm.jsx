import React from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ 
  username, setUsername, email, setEmail, 
  password, setPassword, confirmPassword, setConfirmPassword, 
  onSubmit, loading 
}) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
      
      <div className="text-center mb-8">
        <div className="bg-emerald-50 w-12 h-12 rounded-full flex mx-auto mb-4 items-center justify-center">
          <UserPlus className="text-emerald-600 w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Create an Account</h2>
        <p className="text-slate-500 mt-2 text-sm">Join us to get started.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Username</label>
          <input
            type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            placeholder="johndoe"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Password</label>
          <input
            type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Confirm Password</label>
          <input
            type="password" required minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg flex justify-center items-center gap-2 mt-6 disabled:opacity-70 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign Up'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>

    </div>
  </div>
);

export default RegisterForm;