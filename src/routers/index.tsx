import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Detail from "../pages/detail";
import CreatedRooms from "../pages/createdRooms";
import ChatPage from "../pages/chat";
import Login from "../pages/signIn";
import Signup from "../pages/signUp";

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
    element: <CreatedRooms />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
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
