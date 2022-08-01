import { Navigate, Outlet } from "react-router-dom";

function GurdRoute() {
  return !localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
}

export default GurdRoute;
