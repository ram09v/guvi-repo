import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function InvoiceForm({
  invoice,
  sender,
  client,
  items,
  handleInvoiceChange,
  handleSenderChange,
  handleClientChange,
  handleItemChange,
  addItem,
  deleteItem,
}) {
  return (
    <div className="flex-1 space-y-6 print:hidden">
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Invoice Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Invoice Number</label>
            <input
              type="text"
              name="invoiceNumber"
              value={invoice.invoiceNumber}
              onChange={handleInvoiceChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#10b981] focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Currency Symbol</label>
            <select
              name="currency"
              value={invoice.currency}
              onChange={handleInvoiceChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#10b981] outline-none"
            >
              <option value="$">$ (USD)</option>
              <option value="€">€ (EUR)</option>
              <option value="₹">₹ (INR)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Date Issued</label>
            <input
              type="date"
              name="date"
              value={invoice.date}
              onChange={handleInvoiceChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#10b981] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={invoice.dueDate}
              onChange={handleInvoiceChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#10b981] outline-none"
            />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Bill From (Sender)</h2>
          <div className="space-y-3">
            <input placeholder="Company Name" name="name" value={sender.name} onChange={handleSenderChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-[#10b981] outline-none" />
            <input placeholder="Email" name="email" value={sender.email} onChange={handleSenderChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-[#10b981] outline-none" />
            <input placeholder="Address" name="address" value={sender.address} onChange={handleSenderChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-[#10b981] outline-none" />
            <div className="flex gap-2">
              <input placeholder="City" name="city" value={sender.city} onChange={handleSenderChange} className="w-1/2 border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-[#10b981] outline-none" />
              <input placeholder="Zip Code" name="zip" value={sender.zip} onChange={handleSenderChange} className="w-1/2 border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-[#10b981] outline-none" />
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Bill To (Client)</h2>
          <div className="space-y-3">
            <input placeholder="Client Name" name="name" value={client.name} onChange={handleClientChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-[#10b981] outline-none" />
            <input placeholder="Client Email" name="email" value={client.email} onChange={handleClientChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-[#10b981] outline-none" />
            <input placeholder="Client Address" name="address" value={client.address} onChange={handleClientChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-[#10b981] outline-none" />
            <div className="flex gap-2">
              <input placeholder="City" name="city" value={client.city} onChange={handleClientChange} className="w-1/2 border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-[#10b981] outline-none" />
              <input placeholder="Zip Code" name="zip" value={client.zip} onChange={handleClientChange} className="w-1/2 border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-[#10b981] outline-none" />
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Line Items</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-gray-50 p-3 rounded-lg border border-gray-200 group lg:flex-col">
              <div className="flex-1 w-full">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  className="w-full bg-transparent border-b border-gray-300 focus:border-[#10b981] outline-none py-1 transition-colors"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="w-15">
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-gray-300 rounded p-1 text-center text-sm focus:ring-2 focus:ring-[#10b981] outline-none"
                    min="1"
                  />
                </div>
                <div className="w-25 relative">
                  <span className="absolute left-2 top-1 text-gray-400 text-sm">{invoice.currency}</span>
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-gray-300 rounded p-1 pl-6 text-right text-sm focus:ring-2 focus:ring-[#10b981] outline-none"
                    min="0"
                  />
                </div>
                <div className="w-30 text-right font-medium text-gray-700 py-1">
                  {invoice.currency} {(item.quantity * item.price).toFixed(2)}
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Remove Item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="mt-4 flex items-center gap-2 text-[#059669] hover:text-[#047857] font-medium transition-colors"
        >
          <Plus size={18} />
          Add Line Item
        </button>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">Tax Rate (%)</label>
          <input
            type="number"
            name="taxRate"
            value={invoice.taxRate}
            onChange={handleInvoiceChange}
            className="w-24 border border-gray-300 rounded p-1 text-right focus:ring-2 focus:ring-[#10b981] outline-none"
            min="0"
            max="100"
          />
        </div>
      </section>
    </div>
  );
}