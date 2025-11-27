export default function CartModal({ cart, removeFromCart, onClose }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Cart Items</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p>No Data</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        )}
      </div>
    </div>
  );
}