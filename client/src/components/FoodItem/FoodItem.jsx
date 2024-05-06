import {useContext} from "react";
import {assets} from "../../utils/assets";
import "./FoodItem.css";
import {StoreContext} from "../../context/StoreContext";
import {url} from "../../utils/utils";

const FoodItem = ({item}) => {
  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);
  const {_id, name, description, price, image} = item;

  return (
    <div className="food-item" id="food-item">
      <div className="food-item-image-container">
        <img
          className="food-item-image"
          src={`${url}/images/${image}`}
          alt="food-image"
        />
        {!cartItems[_id] ? (
          <img
            className="add"
            onClick={() => addToCart(_id)}
            src={assets.add_icon_white}
            alt="add-icon"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(_id)}
              src={assets.remove_icon_red}
              alt="remove-icon"
            />
            <p>{cartItems[_id]}</p>
            <img
              onClick={() => addToCart(_id)}
              src={assets.add_icon_green}
              alt="add-icon"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
