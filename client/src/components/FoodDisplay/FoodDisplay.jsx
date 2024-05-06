import {useContext} from "react";
import {StoreContext} from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({category}) => {
  const {foodList} = useContext(StoreContext);

  return (
    <section className="food-display" id="food-display">
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {foodList?.map((item, idx) => {
          if (category === "All" || category === item.category) {
            return <FoodItem key={idx} item={item} />;
          }
        })}
      </div>
    </section>
  );
};

export default FoodDisplay;
