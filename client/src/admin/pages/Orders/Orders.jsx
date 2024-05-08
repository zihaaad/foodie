import {useContext, useEffect, useState} from "react";
import "./Order.css";
import axios from "axios";
import {url} from "../../../utils/utils";
import {StoreContext} from "../../../context/StoreContext";
import Loader from "../../../utils/Loader";
import {assets} from "../../../utils/assets.js";

const Orders = () => {
  const {token} = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    const res = await axios.get(url + "/api/order/order-list", {
      headers: {token},
    });
    if (res.data.success) {
      setIsLoading(false);
      setOrders(res.data.data);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, idx) => (
          <div key={idx} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) => {
                  if (idx === item.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.street +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone"> {order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select>
              <option value="Processing">Processing</option>
              <option value="Processing">Out for Delivery</option>
              <option value="Processing">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
