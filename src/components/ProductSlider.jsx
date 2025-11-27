import { useState, useEffect } from 'react';

export default function ProductSlider({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProducts = products ? products.slice(0, 5) : [];

  useEffect(() => {
    if (featuredProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [featuredProducts.length]);
  
  if (!products || products.length === 0) {
    return <div className="slider">Loading products...</div>;
  }
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };
  return (
    <div className="slider">
      <div className="slider-container">
        <button className="slider-btn prev" onClick={prevSlide}>❮</button>
        
        <div className="slider-content">
          <img 
            src={featuredProducts[currentIndex]?.image} 
            alt={featuredProducts[currentIndex]?.title}
            className="slider-image"
          />
          <div className="slider-info">
            <h3>{featuredProducts[currentIndex]?.title}</h3>
            <p className="price">${featuredProducts[currentIndex]?.price}</p>
          </div>
        </div>

        <button className="slider-btn next" onClick={nextSlide}>❯</button>
      </div>

      <div className="slider-dots">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}