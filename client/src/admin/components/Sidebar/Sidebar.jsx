import {NavLink} from "react-router-dom";
import {adminAssets} from "../../utils/assets";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to={"/"} className="sidebar-option">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            height={30}
            width={30}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <p>Return</p>
        </NavLink>
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
