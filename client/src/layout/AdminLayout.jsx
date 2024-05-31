import React, {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import Navbar from "../admin/components/Navbar/Navbar";
import Sidebar from "../admin/components/Sidebar/Sidebar";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {StoreContext} from "../context/StoreContext";
import Loader from "../utils/Loader";
export const AdminLayout = () => {
  const {isLoading, isAdmin} = useContext(StoreContext);
  if (isLoading) {
    return <Loader />;
  } else if (!isAdmin) {
    <Navigate to={"/"} />;
  }
  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="admin-content">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};
