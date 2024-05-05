import React from "react";
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
        src={adminAssets.profile_image}
        alt="admin-profile-image"
      />
    </div>
  );
};

export default Navbar;
