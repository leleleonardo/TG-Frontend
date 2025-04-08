import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import About from '../pages/about'


const router = createBrowserRouter([
  {path: '/home', element: <Home />, errorElement: <NotFound />},
  {path: '/login', element: <Login />},
  {path: '/about', element: <About />},

])

export default router