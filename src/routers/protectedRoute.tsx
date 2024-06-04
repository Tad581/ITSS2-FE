import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { currentUser }: any = useContext(AuthContext);

  if (!currentUser.uid) {
    return <Navigate to="/login" />;
  }

  return children;
}
