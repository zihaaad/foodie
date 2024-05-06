import {useContext} from "react";
import {assets} from "../../utils/assets";
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {StoreContext} from "../../context/StoreContext";

const Navbar = ({setShowLogin}) => {
  const navigate = useNavigate();
  const {getTotalCartAmmount, setToken, token} = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

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
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} />
            <ul className="navbar-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="bag-icon" />
                <p>Orders</p>
              </li>
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout-icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
