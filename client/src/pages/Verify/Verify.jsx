import React, {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Loader from "../../utils/Loader";
import axios from "axios";
import {url} from "../../utils/utils";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const data = {
    success,
    orderId,
  };
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else if (!response.data.success) {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return <Loader />;
};

export default Verify;
