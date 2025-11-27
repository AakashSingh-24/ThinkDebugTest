export default function ProductCard({ product, addToCart, toggleWishlist, isInWishlist }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
        <button 
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}