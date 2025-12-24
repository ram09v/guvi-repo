import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  return (
    <nav className="bg-primary p-4 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-200 transition">
          ShopStore <span className="text-white opacity-80">India</span>
        </Link>
        
        <Link 
          to="/cart"
          className="bg-white text-primary px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition flex items-center gap-2 shadow-sm"
        >
          <span>Cart</span>
          <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            {cartCount}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;