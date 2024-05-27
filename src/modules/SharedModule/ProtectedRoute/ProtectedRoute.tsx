import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../../Interfaces/Interfaces";



export default function ProtectedRoute({ loginData, children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  
  if (token || loginData) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
