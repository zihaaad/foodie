import {useContext} from "react";
import {StoreContext} from "../context/StoreContext";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children}) {
  const {token, setShowLogin} = useContext(StoreContext);
  if (!token) {
    setShowLogin(true);
    return <Navigate to={"/cart"} />;
  }
  return children;
}
