import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../admin/components/Navbar/Navbar";
import Sidebar from "../admin/components/Sidebar/Sidebar";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../admin/pages/Dashboard/Dashboard";

export const AdminLayout = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="admin-content">
        <Sidebar />
        <Dashboard />
        <Outlet />
      </div>
    </>
  );
};
