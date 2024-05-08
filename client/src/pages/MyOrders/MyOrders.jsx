import {useContext, useEffect, useState} from "react";
import "./MyOrder.css";
import {StoreContext} from "../../context/StoreContext";
import axios from "axios";
import {url} from "../../utils/utils";
import Loader from "../../utils/Loader";
import {assets} from "../../utils/assets";

const MyOrders = () => {
  const {token} = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    const res = await axios.get(url + "/api/order/my-orders", {
      headers: {token},
    });
    if (res.data.success) {
      setIsLoading(false);
      setData(res.data.data);
    }
    if (!res.data.success) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
    console.log(data);
  }, [token]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, idx) => {
          return (
            <div key={idx} className="my-orders-order">
              <img src={assets.parcel_icon} />
              <p>
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p style={{display: "flex", gap: "5px"}}>
                <span> &#x25cf; </span>
                <b> {order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
