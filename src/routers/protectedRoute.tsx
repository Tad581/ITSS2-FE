import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactElement;
  role?: number;
}) {
  const { currentUser }: any = useContext(AuthContext);

  if (!currentUser.uid) {
    return <Navigate to="/login" />;
  }
  if (role !== undefined && (currentUser.role !== role)) {
    return <Navigate to="/" />;
  } 

  return children;
}
