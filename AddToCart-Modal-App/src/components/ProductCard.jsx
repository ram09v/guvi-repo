import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const priceInINR = Math.floor(product.price * 83);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:shadow-gray-400/20 transition-all duration-300 flex flex-col p-4 h-full">
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

      <p className="text-primary text-sm mb-4 capitalize font-bold">{product.category}</p>
      
      <div className="mt-auto flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">₹{priceInINR.toLocaleString('en-IN')}</span>

        <button
          onClick={() => onAddToCart(product)}
          className="bg-button text-white px-4 py-2 rounded-lg font-medium hover:bg-hover transition-colors shadow-md cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;