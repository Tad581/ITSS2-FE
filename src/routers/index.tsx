import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home';
import Detail from '../pages/detail';
import CreatedRooms from '../pages/createdRooms';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detail/:id',
    element: <Detail />,
  },
  {
    path: '/created-rooms',
    element: <CreatedRooms />,
  },
]);

export default router;
