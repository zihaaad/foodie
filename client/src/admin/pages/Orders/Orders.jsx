import {useContext, useEffect, useState} from "react";
import "./Order.css";
import axios from "axios";
import {url} from "../../../utils/utils";
import {StoreContext} from "../../../context/StoreContext";
import Loader from "../../../utils/Loader";
import {assets} from "../../../utils/assets.js";
import {toast} from "react-toastify";

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

  const statusHandler = async (event, orderId) => {
    const res = await axios.patch(
      url + `/api/order/order-status/${orderId}`,
      {
        status: event.target.value,
      },
      {
        headers: {token},
      }
    );

    if (res.data.success) {
      await fetchAllOrders();
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
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
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}>
              <option value="Processing">Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
