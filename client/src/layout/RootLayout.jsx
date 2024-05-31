import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import {useContext, useState} from "react";
import LoginPopup from "../components/LoginPopup/LoginPopup";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {StoreContext} from "../context/StoreContext";
import Loader from "../utils/Loader";

const RootLayout = () => {
  const {showLogin, isLoading} = useContext(StoreContext);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup />}
      <Navbar />
      <main className="root-conent">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
