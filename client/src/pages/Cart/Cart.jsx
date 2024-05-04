import {useContext} from "react";
import "./Cart.css";
import {StoreContext} from "../../context/StoreContext";
import {useNavigate} from "react-router-dom";

const Cart = () => {
  const {cartItems, food_list, removeFromCart, getTotalCartAmmount} =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <section className="cart">
      <div className="cart-item">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {!getTotalCartAmmount() && (
          <div
            style={{
              textAlign: "center",
              margin: "2rem 0",
              fontWeight: "500",
              fontSize: "1.4rem",
            }}>
            Your Cart is Empty
          </div>
        )}

        {food_list.map((item, idx) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div key={idx} className="cart-items-title cart-items-item">
                  <img src={item.image} alt="cart-item-image" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
