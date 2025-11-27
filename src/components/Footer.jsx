import banner2 from '../assets/banner-2.jpg';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-banner">
        <img src={banner2} alt="Banner" className="footer-banner-image" />
      </div>
      
      <div className="footer-content">
        <div className="footer-info">
          <img src={logo} alt="MySite" className="footer-logo" />
          <div className="footer-text">
            <p>MySite - Your trusted online store</p>
            <p>Quality products at best prices</p>
            <p>Contact: info@mysite.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
        </div>
      </div>
    </footer>
  );
}