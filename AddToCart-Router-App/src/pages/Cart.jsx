import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, onRemove, onUpdateQuantity }) => {

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + Math.floor(item.price * 83) * item.quantity;
  }, 0);

  const discountAmount = Math.floor(subTotal * 0.10);
  const finalTotal = subTotal - discountAmount;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <div className="text-6xl mb-4 grayscale opacity-40">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link 
          to="/" 
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-hover transition"
        >
          Go Back Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-primary mb-6 border-b pb-4">Shopping Cart</h2>

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="flex-1 space-y-4">
          {cartItems.map((item) => {
            const unitPrice = Math.floor(item.price * 83);
            const itemTotal = unitPrice * item.quantity;

            return (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">Unit Price: ₹{unitPrice.toLocaleString('en-IN')}</p>

                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 text-sm font-semibold hover:underline"
                  >
                    Remove from Cart
                  </button>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold text-gray-600 transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-semibold text-gray-800 bg-white min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold text-gray-600 transition"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-primary mt-1">
                    ₹{itemTotal.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 flex justify-between items-center text-xl font-bold text-primary">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
            
            <button className="w-full mt-6 bg-cartBtn text-white py-3 rounded-lg font-bold hover:bg-hover transition shadow-md">
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;