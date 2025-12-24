import React from 'react';

const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="bg-gray-900 p-4 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">
          ShopNest <span className="text-[var(--theme-color)]">India</span>
        </h1>
        <button
          onClick={onOpenCart}
          className="bg-white text-[var(--theme-color)] px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Cart</span>
          <span className="bg-[var(--theme-color)] text-white text-xs font-bold px-2 py-1 rounded-full">
            {cartCount}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;