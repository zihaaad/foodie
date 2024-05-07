import {useContext, useState} from "react";
import {ExploreMenu} from "../../components/ExploreMenu/ExploreMenu";
import Header from "../../components/Header/Header";
import "./Home.css";
import AppDownload from "../../components/AppDownload/AppDownload";
import {Link} from "react-router-dom";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import {StoreContext} from "../../context/StoreContext";
import {assets} from "../../utils/assets";

const Home = () => {
  const [category, setCategory] = useState("All");
  const {getTotalCartAmmount} = useContext(StoreContext);

  return (
    <>
      {getTotalCartAmmount() && (
        <>
          <Link className="float-cart" to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>
        </>
      )}
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </>
  );
};

export default Home;
