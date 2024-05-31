import {useContext} from "react";
import {StoreContext} from "../context/StoreContext";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children}) {
  const {token, isLoading, isAdmin, setShowLogin} = useContext(StoreContext);

  if (!isLoading && token && isAdmin) {
    return <Navigate to={"/"} />;
  }

  if (!isLoading && !token) {
    setShowLogin(true);
    return <Navigate to={"/"} />;
  }

  return children;
}
