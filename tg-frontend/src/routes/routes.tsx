import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login/index';
import Home from '../pages/home';
//import Login from '../pages/login'
import About from '../pages/about'
import AgendaPage from '../pages/agenda';


const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/home', element: <Home /> },
/*   {path: '/login', element: <Login />}, */
  {path: '/about', element: <About />},
  {path: '/agenda', element: <AgendaPage />},
]);

export default router;
