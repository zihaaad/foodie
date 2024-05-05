import {NavLink} from "react-router-dom";
import {adminAssets} from "../../utils/assets";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to={"add-food"} className="sidebar-option">
          <img src={adminAssets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to={"food-list"} className="sidebar-option">
          <img src={adminAssets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to={"orders"} className="sidebar-option">
          <img src={adminAssets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
