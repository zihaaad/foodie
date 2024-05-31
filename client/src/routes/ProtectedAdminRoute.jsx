import {useContext} from "react";
import {StoreContext} from "../context/StoreContext";
import {Navigate} from "react-router-dom";
import Loader from "../utils/Loader";

export default function ProtectedAdminRoute({children}) {
  const {token, isAdmin, isLoading} = useContext(StoreContext);

  if (isLoading) {
    <Loader />;
  } else if (!token) {
    return <Navigate to={"/"} />;
  } else if (!token || !isAdmin) {
    return <Navigate to={"/"} />;
  }
  return children;
}
