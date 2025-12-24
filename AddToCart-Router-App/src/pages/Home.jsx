import React from 'react';

const Home = ({ products, loading, cart, onAddToCart, onRemoveFromCart }) => {
  
  // Helper to check if item is in cart
  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <main className="container mx-auto p-4 md:p-6">
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="text-xl font-bold text-primary">Loading Store...</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const priceInINR = Math.floor(product.price * 83);
            const added = isInCart(product.id);

            return (
              <div key={product.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-4 h-full">
                <div className="h-48 flex justify-center items-center mb-4 p-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1" title={product.title}>
                  {product.title}
                </h3>
                <p className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{product.category}</p>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4" title={product.description}>{product.description}</p>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">₹{priceInINR.toLocaleString('en-IN')}</span>

                  {added ? (
                    <button
                      onClick={() => onRemoveFromCart(product.id)}
                      className="bg-removeBtn text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors shadow-md cursor-pointer text-sm"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-cartBtn text-white px-4 py-2 rounded-lg font-medium hover:bg-hover transition-colors shadow-md cursor-pointer text-sm"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Home;