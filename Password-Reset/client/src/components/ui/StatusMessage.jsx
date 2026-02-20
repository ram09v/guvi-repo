import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, XCircle, ArrowLeft } from 'lucide-react';

const StatusMessage = ({ type, title, message, linkTo, linkText }) => {
  const isSuccess = type === 'success';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
        {isSuccess ? (
          <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-emerald-600 w-8 h-8" />
          </div>
        ) : (
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="text-red-500 w-8 h-8" />
          </div>
        )}
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
        <p className="text-slate-500 mb-6">{message}</p>
        
        {linkTo && (
          <Link 
            to={linkTo} 
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors w-full"
          >
            {isSuccess ? null : <ArrowLeft size={16} />} 
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default StatusMessage;