import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {url} from "../utils/utils";
import debounce from "lodash/debounce";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") || false
  );

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({...prev, [itemId]: 1}));
    } else {
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", {itemId}, {headers: {token}});
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    if (token) {
      await axios.post(url + "/api/cart/remove", {itemId}, {headers: {token}});
    }
  };

  const loadCartData = async (token) => {
    await axios
      .get(url + "/api/cart", {headers: {token}})
      .then((res) => {
        setCartItems(res.data.data || {});
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const getTotalCartAmmount = () => {
    let totalAmmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmmount;
  };

  const localToken = localStorage.getItem("token");

  useEffect(() => {
    async function fetchAdminStatus() {
      if (localToken) {
        setIsLoading(true);
        try {
          const response = await axios.get(`${url}/api/user/admin`, {
            headers: {token: localToken},
          });
          if (response.data.success) {
            setIsAdmin(true);
            localStorage.setItem("isAdmin", true);
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    }

    async function loadFoodList() {
      await axios.get(`${url}/api/food`).then((res) => {
        setFoodList(res.data.data);
        setIsLoading(false);
      });
    }
    if (localToken) {
      setToken(localToken);
      loadCartData(localToken);
      fetchAdminStatus();
    } else {
      localStorage.removeItem("isAdmin");
    }

    loadFoodList();
  }, [localToken]);

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmmount,
    isLoading,
    token,
    setToken,
    showLogin,
    setShowLogin,
    isAdmin,
    setIsAdmin,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
