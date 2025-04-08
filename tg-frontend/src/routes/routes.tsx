import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login/index';
import Home from '../pages/home';



const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/home', element: <Home /> },
]);

export default router;
