import {useContext} from "react";
import {StoreContext} from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({category}) => {
  const {food_list} = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, idx) => {
          if (category === "All" || category === item.category) {
            return <FoodItem key={idx} item={item} />;
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
