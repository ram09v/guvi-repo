import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  return (
    <Router>
      <div className="min-h-screen font-sans">
        <Navbar cartCount={cart.length} />

        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                products={products} 
                loading={loading} 
                cart={cart} 
                onAddToCart={addToCart} 
                onRemoveFromCart={removeFromCart} 
              />
            } 
          />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cartItems={cart} 
                onRemove={removeFromCart} 
                onUpdateQuantity={updateQuantity} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;