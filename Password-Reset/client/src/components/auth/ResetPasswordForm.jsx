import React from 'react';
import { Lock, CheckCircle, Loader2 } from 'lucide-react';

const ResetPasswordForm = ({ 
  password, setPassword, 
  confirmPassword, setConfirmPassword, 
  onSubmit, loading 
}) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
      <div className="text-center mb-8">
        <div className="bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-emerald-600 w-6 h-6" />
          </div>
        <h2 className="text-2xl font-bold text-slate-800">Set New Password</h2>
        <p className="text-slate-500 mt-2 text-sm">
            Please enter your new password below.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">New Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Confirm Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
        <button 
          type="submit" disabled={loading} 
          className="w-full bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5"/> : <>Reset Password <CheckCircle size={16}/></>}
        </button>
      </form>
    </div>
  </div>
);

export default ResetPasswordForm;