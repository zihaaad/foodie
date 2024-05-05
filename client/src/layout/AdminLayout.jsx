import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../admin/components/Navbar/Navbar";
import Sidebar from "../admin/components/Sidebar/Sidebar";

export const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="admin-content">
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
