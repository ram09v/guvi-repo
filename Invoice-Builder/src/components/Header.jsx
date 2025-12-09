import React from 'react';
import { RefreshCcw, Printer, Download } from 'lucide-react';

export default function Header({ onReset, onPrint, onPdf, isGenerating }) {
  return (
    //Used Hex code for all color classes to ensure the PDF generation works properly without oklch compatibility issues.
    <header className="bg-[#111827] text-white p-4 shadow-lg print:hidden sticky top-0 z-10">
      <div className="w-full px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-lg text-[#111827] font-bold text-xl">IB</div>
          <h1 className="text-2xl font-bold tracking-tight">Invoice Builder</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 bg-[#1f2937] hover:bg-[#374151] text-white px-3 py-2 rounded-lg transition-colors text-sm border border-[#374151]"
            title="Reset to Defaults"
          >
            <RefreshCcw size={16} />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-4 py-2 rounded-lg transition-colors border border-[#047857]"
          >
            <Printer size={18} />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            onClick={onPdf}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-white text-[#047857] hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Download size={18} />
            <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}