import {useState} from "react";
import {assets} from "../../utils/assets";
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");

  return (
    <nav className="navbar">
      <img className="logo" src={assets.logo} alt="logo" />
      <ul className="navbar-menu">
        <Link to={"/"} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}>
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}>
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}>
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
