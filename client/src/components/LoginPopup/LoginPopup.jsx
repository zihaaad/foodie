import {useState} from "react";
import "./LoginPopup.css";
import {assets} from "../../utils/assets";

const LoginPopup = ({setShowLogin}) => {
  const [currentSate, setCurrentState] = useState("Login");
  return (
    <section className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentSate}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currentSate === "Login" || (
            <input type="text" placeholder="Your Name" required />
          )}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>
          {currentSate === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currentSate === "Login" ? (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an Account{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </section>
  );
};

export default LoginPopup;
