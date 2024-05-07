import {useContext} from "react";
import "./FoodDisplay.css";
import Loader from "../../utils/Loader";
import {StoreContext} from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({category}) => {
  const {foodList, isLoading} = useContext(StoreContext);

  if (isLoading) {
    return <Loader size={100} />;
  }

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
