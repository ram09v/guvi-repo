import React from 'react';

const CartModal = ({ isOpen, onClose, cartItems, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">

        <div className="flex justify-between items-center p-4 border-b border-[var(--theme-color)] bg-[var(--theme-color)]">
          <h2 className="text-xl font-bold text-white">Your Cart ({cartItems.length})</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 font-bold text-2xl leading-none transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 bg-gray-50">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center">
                <div className="text-6xl mb-4 grayscale opacity-50">🛒</div>
                <p className="text-gray-500 text-lg">Your cart is empty.</p>
                <button onClick={onClose} className="mt-4 text-[var(--theme-color)] font-bold hover:underline">Start Shopping</button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                 const priceInINR = Math.floor(item.price * 83);
                 return (
                  <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="w-16 h-16 flex-shrink-0 bg-white p-1 rounded border border-gray-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h4>
                      <p className="text-[var(--theme-color)] font-bold">₹{priceInINR.toLocaleString('en-IN')}</p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-red-500 hover:text-white hover:bg-red-500 border border-red-200 px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
                    >
                      Remove
                    </button>
                  </div>
                 )
              })}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 font-semibold px-4 py-2 transition cursor-pointer whitespace-nowrap"
                >
                    Continue Shopping
                </button>
                <button
                    className="bg-[var(--theme-color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--theme-hover)] transition font-medium cursor-pointer shadow-md whitespace-nowrap"
                >
                    Checkout
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;