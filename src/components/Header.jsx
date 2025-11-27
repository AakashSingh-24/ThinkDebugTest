import { useState } from 'react';
import CartModal from './CartModal';
import logo from '../assets/logo.png';

export default function Header({ cart, searchTerm, setSearchTerm, removeFromCart, wishlist }) {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <img src={logo} alt="MySite" className="logo" />
          
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="header-buttons">
            <button className="wishlist-btn-header">
              ❤️ Likes ({wishlist.length})
            </button>
            
            <button 
              className="cart-btn"
              onClick={() => setShowCart(true)}
            >
              🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </div>
      </header>

      {showCart && <CartModal cart={cart} removeFromCart={removeFromCart} onClose={() => setShowCart(false)} />}
    </>
  );
}