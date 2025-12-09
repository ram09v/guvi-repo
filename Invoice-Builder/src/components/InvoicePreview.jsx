import React from 'react';

export default function InvoicePreview({ invoice, sender, client, items, subtotal, taxAmount, total }) {
  return (
    <div className="lg:w-[210mm]">
      <div className="lg:hidden mb-4 text-center font-bold text-[#6b7280] uppercase tracking-widest text-sm">
        Live Preview Below
      </div>
      <div className="shadow-2xl border border-[#e5e7eb] bg-[#ffffff] rounded-sm overflow-hidden print:shadow-none print:border-none print:m-0">
        <div id="invoice-preview-content" className="p-8 md:p-12 min-h-[297mm] relative bg-[#ffffff] text-[#1e293b] text-sm leading-relaxed">

          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-extrabold text-[#047857] tracking-tight mb-1">INVOICE</h1>
              <p className="text-[#64748b] font-medium">#{invoice.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <h2 className="font-bold text-lg text-[#1e293b]">{sender.name || 'Sender Name'}</h2>
              <p className="text-[#64748b] text-xs mt-1 max-w-[200px] ml-auto">
                {sender.address}<br />
                {sender.city} {sender.zip}<br />
                {sender.email}
              </p>
            </div>
          </div>

          <div className="flex justify-between mb-12 border-t border-b border-[#f3f4f6] py-6">
            <div>
              <span className="text-[#059669] font-bold text-xs uppercase tracking-wider block mb-1">Bill To</span>
              <h3 className="font-bold text-[#1e293b] text-base">{client.name || 'Client Name'}</h3>
              <div className="text-[#64748b] text-xs mt-1">
                <p>{client.address}</p>
                <p>{client.city} {client.zip}</p>
                <p>{client.email}</p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div>
                <span className="text-[#9ca3af] font-medium text-xs uppercase block">Date Issued</span>
                <span className="font-semibold">{invoice.date}</span>
              </div>
              <div>
                <span className="text-[#9ca3af] font-medium text-xs uppercase block">Due Date</span>
                <span className="font-semibold">{invoice.dueDate}</span>
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-col items-center">
            <table className="w-full">
              <thead>
                <tr className="bg-[#ecfdf5] text-[#047857] text-left">
                  <th className="py-3 px-4 font-semibold text-xs uppercase rounded-l-md">Description</th>
                  <th className="py-3 px-4 font-semibold text-xs uppercase text-center">Qty</th>
                  <th className="py-3 px-4 font-semibold text-xs uppercase text-right">Price</th>
                  <th className="py-3 px-4 font-semibold text-xs uppercase text-right rounded-r-md">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 px-4 font-medium text-[#334155]">{item.description}</td>
                    <td className="py-4 px-4 text-center text-[#64748b]">{item.quantity}</td>
                    <td className="w-30 py-4 px-4 text-right text-[#64748b]">{invoice.currency} {Number(item.price).toFixed(2)}</td>
                    <td className="w-30 py-4 px-4 text-right font-semibold text-[#334155]">{invoice.currency} {(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mb-12">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-[#64748b]">
                <span>Subtotal</span>
                <span>{invoice.currency} {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#64748b]">
                <span>Tax ({invoice.taxRate}%)</span>
                <span>{invoice.currency} {taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-[#e5e7eb] pt-3 text-lg font-bold text-[#047857]">
                <span>Total</span>
                <span>{invoice.currency} {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 right-12 text-center">
            <p className="text-[#94a3b8] text-xs">
              Thank you for your business. Please make checks payable to {sender.name || 'us'}.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}