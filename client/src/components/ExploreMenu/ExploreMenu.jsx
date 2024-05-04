/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./ExploreMenu.css";
import {menu_list} from "../../utils/assets";

export const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable aray of dishes. Our
        Mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, idx) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={idx}
              className="explore-menu-list-item">
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt="menu-image"
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr className="explore-menu" />
    </div>
  );
};
