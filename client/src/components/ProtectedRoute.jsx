import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
}) => {
  const token =
    localStorage.getItem("adminToken");

  const adminEmail =
    localStorage.getItem("adminEmail");

  

  if (!token) {
   return <Navigate to="/harthick23" />;
  }

 if (
  adminEmail?.toLowerCase() !==
  "sundharkarthick03@gmail.com"
) {
  return <Navigate to="/" />;
}

  return children;
};

export default ProtectedRoute;