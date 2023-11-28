import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/home';
import Detail from '../components/detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
]);

export default router;
