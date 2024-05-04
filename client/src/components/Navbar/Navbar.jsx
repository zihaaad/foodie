import {useContext, useState} from "react";
import {assets} from "../../utils/assets";
import "./Navbar.css";
import {Link} from "react-router-dom";
import {StoreContext} from "../../context/StoreContext";

const Navbar = ({setShowLogin}) => {
  const {getTotalCartAmmount} = useContext(StoreContext);

  return (
    <nav className="navbar">
      <Link to={"/"}>
        <img className="logo" src={assets.logo} alt="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to={"/"}>Home</Link>
        <a href="#explore-menu">Menu</a>
        <a href="#app-download">Mobile App</a>
        <a href="#footer">Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmmount() && "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
