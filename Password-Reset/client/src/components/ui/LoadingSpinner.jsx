import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
  </div>
);

export default LoadingSpinner;