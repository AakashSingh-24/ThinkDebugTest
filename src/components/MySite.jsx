import { useState, useEffect } from 'react';
import Header from './Header';
import ProductSlider from './ProductSlider';
import ProductCard from './ProductCard';
import Filters from './Filters';
import Footer from './Footer';

export default function MySite() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log("fetchProducts",data);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


  

  useEffect(() => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, sortBy, categoryFilter, products]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    const newWishlist = isInWishlist
      ? wishlist.filter(item => item.id !== product.id)
      : [...wishlist, product];
    
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="mysite">
      <Header 
        cart={cart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        removeFromCart={removeFromCart}
        wishlist={wishlist}
      />
      
       <main className="main-content">
        <section className="hero-section">
          <h2>Featured Products</h2>
          <ProductSlider products={products} />
        </section>

     <section className="products-section">
          <div className="container">
            <div className="section-header">
              <h2>All Products</h2>
              <Filters 
                categories={categories}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={wishlist.some(item => item.id === product.id)}
                />
              ))}
            </div> 
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}