import {useContext, useState} from "react";
import "./LoginPopup.css";
import {assets} from "../../utils/assets";
import {url} from "../../utils/utils";
import axios from "axios";
import {StoreContext} from "../../context/StoreContext";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

const LoginPopup = () => {
  const [currentSate, setCurrentState] = useState("Login");
  const {setToken, setShowLogin, isLoading, isAdmin} = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({...data, [name]: value}));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentSate === "Login") {
      newUrl += "/api/user/login";
    } else if (currentSate === "Sign Up") {
      newUrl += "/api/user/register";
    }

    try {
      const res = await axios.post(newUrl, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
        toast.success(res.data.message);
        if (isAdmin) return <Navigate to={"/admin-panel"} />;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("failed to authenticate");
      // console.log(error);
    }
  };

  return (
    <section className="login-popup">
      <form onSubmit={handleLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentSate}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currentSate === "Login" || (
            <input
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currentSate === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {currentSate === "Sign Up" && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}

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
