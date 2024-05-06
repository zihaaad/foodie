import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {url} from "../utils/utils";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({...prev, [itemId]: 1}));
    } else {
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
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

  useEffect(async () => {
    const localToken = localStorage.getItem("token");
    await axios.get(`${url}/api/food`).then((res) => {
      setFoodList(res.data.data);
    });
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
