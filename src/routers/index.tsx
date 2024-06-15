import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Detail from "../pages/detail";
import CreatedRooms from "../pages/createdRooms";
import ChatPage from "../pages/chat";
import Login from "../pages/signIn";
import Signup from "../pages/signUp";
import Profile from "../pages/profile";
import AdminUsers from "../pages/admin/user";
import AdminRooms from "../pages/admin/room";
import ProtectedRoute from "./protectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/created-rooms",
    element: (
      <ProtectedRoute>
        <CreatedRooms />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute role={0}>
        <AdminUsers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/rooms",
    element: (
      <ProtectedRoute role={0}>
        <AdminRooms />
      </ProtectedRoute>
    )
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
