import {useContext} from "react";
import {assets} from "../../utils/assets";
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {StoreContext} from "../../context/StoreContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    getTotalCartAmmount,
    setToken,
    token,
    setShowLogin,
    isAdmin,
    setIsAdmin,
  } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setIsAdmin(false);
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
        {isAdmin && <Link to={"/admin-panel"}>Admin Panel</Link>}
        {token && !isAdmin && <Link to="/myorders">Orders</Link>}
      </ul>
      <div className="navbar-right">
        {!isAdmin && (
          <div className="navbar-search-icon">
            <Link to={"/cart"}>
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={getTotalCartAmmount() && "dot"}></div>
          </div>
        )}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} />
            <ul className="navbar-profile-dropdown">
              {!isAdmin && (
                <Link to={"/myorders"}>
                  <li>
                    <img src={assets.bag_icon} alt="bag-icon" />
                    <p>Orders</p>
                  </li>
                </Link>
              )}
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
