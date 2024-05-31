import React, {useContext} from "react";
import "./Navbar.css";
import {adminAssets} from "../../utils/assets";

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <img
        className="admin-panel-logo"
        src={adminAssets.logo}
        alt="admin-panel-logo"
      />
      <img
        className="admin-profile"
        src="https://cdn.vectorstock.com/i/500p/61/33/admin-administrator-panel-web-icon-vector-40886133.jpg"
        alt="admin-profile-image"
      />
    </div>
  );
};

export default Navbar;
