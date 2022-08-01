import { Navigate, Outlet } from "react-router-dom";

function GurdAll() {
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/sgin-up" />
  );
}

export default GurdAll;
