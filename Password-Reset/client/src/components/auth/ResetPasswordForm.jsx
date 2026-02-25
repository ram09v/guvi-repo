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
        <div className="bg-violet-50 w-12 h-12 rounded-full flex mx-auto mb-4 items-center justify-center">
          <Lock className="text-violet-600 w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Set New Password</h2>
        <p className="text-slate-500 mt-2 text-sm">Please secure your account with a new password.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">New Password</label>
          <input 
            type="password" required minLength={6} placeholder="••••••••" 
            value={password} onChange={e => setPassword(e.target.value)} 
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all" 
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Confirm Password</label>
          <input 
            type="password" required minLength={6} placeholder="••••••••" 
            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} 
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all" 
          />
        </div>

        <button 
          type="submit" disabled={loading} 
          className="w-full bg-violet-600 text-white py-2.5 rounded-lg hover:bg-violet-700 flex justify-center items-center gap-2 mt-6 disabled:opacity-70 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5"/> : <>Update Password <CheckCircle size={16}/></>}
        </button>
      </form>

    </div>
  </div>
);

export default ResetPasswordForm;