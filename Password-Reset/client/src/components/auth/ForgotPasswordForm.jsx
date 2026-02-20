import React from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';

const ForgotPasswordForm = ({ email, setEmail, onSubmit, loading }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
      <div className="text-center mb-8">
        <div className="bg-indigo-50 w-12 h-12 rounded-full flex mx-auto mb-4 items-center justify-center">
          <Mail className="text-indigo-600 w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Forgot Password?</h2>
        <p className="text-slate-500 mt-2 text-sm">Enter your email and we'll send you a link to reset your password.</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
          placeholder="you@example.com"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg flex justify-center gap-2 items-center disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Send Link <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
    </div>
  </div>
);

export default ForgotPasswordForm;