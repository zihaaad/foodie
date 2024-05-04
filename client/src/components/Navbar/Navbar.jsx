import {useEffect, useState} from "react";
import {assets} from "../../utils/assets";
import "./Navbar.css";
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
  const {pathname} = useLocation();
  const [menu, setMenu] = useState();

  useEffect(() => {
    return setMenu(pathname);
  }, [pathname]);

  return (
    <nav className="navbar">
      <img src={assets.logo} alt="logo" />
      <ul className="navbar-menu">
        <li className={menu === "/" ? "active" : ""}>
          <Link to={"/"}>Home</Link>
        </li>
        <li className={menu === "/menu" ? "active" : ""}>
          <Link to={"/menu"}>Menu</Link>
        </li>
        <li className={menu === "mobile-app" ? "active" : ""}>
          <Link to={"/"}>Mobile App</Link>
        </li>
        <li className={menu === "/contact-us" ? "active" : ""}>
          <Link to={"/"}>Contact Us</Link>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
