import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg animate-pulse">
    <div className="h-64 bg-gray-700 w-full"></div>
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-20 bg-gray-700 rounded w-full"></div>
    </div>
  </div>
);

export const ErrorState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
    <div className="bg-red-500/10 p-6 rounded-full mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">Oops! No results found</h3>
    <p className="text-gray-400 max-w-md">{message || "We couldn't find any results matching your search. Try adjusting your filters or keywords."}</p>
  </div>
);

export const WelcomeState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
    <p className="text-xl">Start by searching for a movie or series title above.</p>
  </div>
);