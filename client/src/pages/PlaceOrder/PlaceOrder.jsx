import {useContext} from "react";
import "./PlaceOrder.css";
import {StoreContext} from "../../context/StoreContext";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {url} from "../../utils/utils";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {getTotalCartAmmount, foodList, cartItems, token} =
    useContext(StoreContext);
  const {register, handleSubmit} = useForm();

  const onSubmit = async (data) => {
    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    const orderData = {
      address: data,
      items: orderItems,
      amount: Number(getTotalCartAmmount() + 2),
    };
    const res = await axios.post(
      url + "/api/order/place-order",
      {orderData},
      {headers: {token}}
    );
    if (res.data.success) {
      const {session_url} = res.data;
      window.location.replace(session_url);
    } else {
      toast.error("Failed To Payment");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            {...register("firstName", {required: true})}
            type="text"
            placeholder="First Name"
          />
          <input
            {...register("lastName", {required: true})}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          {...register("email", {required: true})}
          type="email"
          placeholder="Email Address"
        />
        <input
          {...register("street", {required: true})}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            {...register("city", {required: true})}
            type="text"
            placeholder="City"
          />
          <input
            {...register("state", {required: true})}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            {...register("zipcode", {required: true})}
            type="text"
            placeholder="Zip code"
          />
          <input
            {...register("country", {required: true})}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          {...register("phone", {required: true})}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmmount() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmmount() > 0 ? getTotalCartAmmount() + 2 : 0}
              </b>
            </div>
            <button
              disabled={!getTotalCartAmmount()}
              onClick={() => navigate("/order")}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
