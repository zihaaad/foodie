import {useEffect, useState} from "react";
import "./FoodList.css";
import axios from "axios";
import {toast} from "react-toastify";
import {url} from "../../../utils/utils";

export const FoodList = () => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    await axios.get(`${url}/api/food`).then((res) => setList(res.data.data));
  };

  const handleRemoveFood = async (foodId) => {
    await axios.delete(`${url}/api/food/${foodId}`).then((res) => {
      toast.success(res.data.message);
      fetchList();
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, idx) => (
          <div key={idx} className="list-table-format">
            <img src={`${url}/images/` + item.image} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className="croos-btn" onClick={() => handleRemoveFood(item._id)}>
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
