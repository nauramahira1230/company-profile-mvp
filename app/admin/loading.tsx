import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm animate-pulse">
        <div className="space-y-3">
          <div className="h-6 w-32 bg-slate-200 rounded-lg"></div>
          <div className="h-3 w-20 bg-slate-100 rounded-lg"></div>
        </div>
        <div className="h-12 w-full md:w-80 bg-slate-100 rounded-2xl"></div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden animate-pulse">
        <div className="p-8 space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-6 last:border-0">
              <div className="space-y-2">
                <div className="h-4 w-40 bg-slate-200 rounded"></div>
                <div className="h-3 w-24 bg-slate-100 rounded"></div>
              </div>
              <div className="h-4 w-60 bg-slate-50 rounded hidden md:block"></div>
              <div className="h-4 w-20 bg-slate-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}