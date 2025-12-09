import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import Header from './components/Header';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { defaultInvoice, defaultSender, defaultClient, defaultItems } from './data/defaults';

export default function App() {
  const [invoice, setInvoice] = useState(() => {
    try {
      const saved = localStorage.getItem('invoice_data');
      return saved ? JSON.parse(saved) : defaultInvoice;
    } catch (e) { return defaultInvoice; }
  });
  const [sender, setSender] = useState(() => {
    try {
      const saved = localStorage.getItem('sender_data');
      return saved ? JSON.parse(saved) : defaultSender;
    } catch (e) { return defaultSender; }
  });
  const [client, setClient] = useState(() => {
    try {
      const saved = localStorage.getItem('client_data');
      return saved ? JSON.parse(saved) : defaultClient;
    } catch (e) { return defaultClient; }
  });
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('items_data');
      return saved ? JSON.parse(saved) : defaultItems;
    } catch (e) { return defaultItems; }
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    localStorage.setItem('invoice_data', JSON.stringify(invoice));
    localStorage.setItem('sender_data', JSON.stringify(sender));
    localStorage.setItem('client_data', JSON.stringify(client));
    localStorage.setItem('items_data', JSON.stringify(items));
  }, [invoice, sender, client, items]);

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const taxAmount = (subtotal * invoice.taxRate) / 100;
  const total = subtotal + taxAmount;

  const handleInvoiceChange = (e) => setInvoice({ ...invoice, [e.target.name]: e.target.value });
  const handleSenderChange = (e) => setSender({ ...sender, [e.target.name]: e.target.value });
  const handleClientChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });
  
  const handleItemChange = (id, field, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };
  
  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), description: '', quantity: 1, price: 0 },
    ]);
  };
  
  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  
  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      setInvoice(defaultInvoice);
      setSender(defaultSender);
      setClient(defaultClient);
      setItems(defaultItems);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generatePDF = () => {
    setIsGenerating(true);
    const element = document.getElementById('invoice-preview-content');
    
    const opt = {
      margin: 10,
      filename: `Invoice_${invoice.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => setIsGenerating(false))
      .catch(err => {
        console.error(err);
        setIsGenerating(false);
      });
  };

  return (
    <div className="h-auto bg-gray-100 font-sans text-gray-800">
      <Header 
        onReset={resetData} 
        onPrint={handlePrint} 
        onPdf={generatePDF} 
        isGenerating={isGenerating} 
      />

      <main className="min-h-screen max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">

        <InvoiceForm
          invoice={invoice}
          sender={sender}
          client={client}
          items={items}
          handleInvoiceChange={handleInvoiceChange}
          handleSenderChange={handleSenderChange}
          handleClientChange={handleClientChange}
          handleItemChange={handleItemChange}
          addItem={addItem}
          deleteItem={deleteItem}
        />

        <InvoicePreview 
          invoice={invoice}
          sender={sender}
          client={client}
          items={items}
          subtotal={subtotal}
          taxAmount={taxAmount}
          total={total}
        />

      </main>
    </div>
  );
}