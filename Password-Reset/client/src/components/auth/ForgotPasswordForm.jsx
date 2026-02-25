import React from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = ({ email, setEmail, onSubmit, loading }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
      
      <div className="text-center mb-8">
        <div className="bg-amber-50 w-12 h-12 rounded-full flex mx-auto mb-4 items-center justify-center">
          <Mail className="text-amber-600 w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Forgot Password?</h2>
        <p className="text-slate-500 mt-2 text-sm">Enter your email to receive a reset link.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
          placeholder="you@example.com"
        />
        
        <button
          type="submit" disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 rounded-lg flex justify-center items-center gap-2 disabled:opacity-70 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Send Reset Link <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/login" className="text-sm text-amber-600 font-medium hover:underline">
          Back to Sign In
        </Link>
      </div>

    </div>
  </div>
);

export default ForgotPasswordForm;