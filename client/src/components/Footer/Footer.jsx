import {assets} from "../../utils/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} className="footer-logo" alt="footer-logo" />
          <p>
            Featuring a delectable Array of Dishes crafted with the finest
            ingredients and culinary expertise. Our mission in to satisfy your
            cravings and elevate your dining experience, one delicious meal at a
            time.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook-icon" />
            <img src={assets.twitter_icon} alt="twitter-icon" />
            <img src={assets.linkedin_icon} alt="linkedin-icon" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@foodie.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; Foodie.com - All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
