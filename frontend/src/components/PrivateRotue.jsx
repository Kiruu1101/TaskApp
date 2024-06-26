import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRotue = () => {
  const { user } = useSelector((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRotue;
