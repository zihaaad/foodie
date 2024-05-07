import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {url} from "../utils/utils";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setCartItems(res.data.data);
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

  useEffect(() => {
    setIsLoading(true);
    const localToken = localStorage.getItem("token");
    async function loadFoodList() {
      await axios.get(`${url}/api/food`).then((res) => {
        setFoodList(res.data.data);
        setIsLoading(false);
      });
    }
    if (localToken) {
      setToken(localToken);
      loadCartData(localToken);
    }
    loadFoodList();
  }, []);

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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
