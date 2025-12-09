export const defaultInvoice = {
  invoiceNumber: 'INV-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  currency: '₹',
  taxRate: 10,
};

export const defaultSender = {
  name: 'Sender Corp Solutions',
  address: '123 Innovation Drive',
  city: 'Tech City',
  zip: '12345',
  email: 'billing@sendercorp.com',
};

export const defaultClient = {
  name: 'Client Company LLC',
  address: '456 Business Road',
  city: 'Metropolis',
  zip: '98765',
  email: 'accounts@clientllc.com',
};

export const defaultItems = [
  { id: 1, description: 'T-shirt', quantity: 5, price: 499.0 },
  { id: 2, description: 'Shirt', quantity: 2, price: 799.0 },
  { id: 3, description: 'Jeans', quantity: 2, price: 1499.0 },
];