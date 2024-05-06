import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import {useState} from "react";
import LoginPopup from "../components/LoginPopup/LoginPopup";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <main className="root-conent">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
