import {useContext} from "react";
import {StoreContext} from "../context/StoreContext";
import {Navigate} from "react-router-dom";
import Loader from "../utils/Loader";

export default function ProtectedAdminRoute({children}) {
  const {token, isLoading} = useContext(StoreContext);

  if (!token && isLoading) {
    return <Loader />;
  }

  if (token && !isLoading && !isAdmin) {
    return <Navigate to={"/"} />;
  }

  return children;
}
