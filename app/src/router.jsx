import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/login.jsx';
import Main from './pages/welcome.jsx';
import Navbar from './ui/navbar.jsx';

export const router = createBrowserRouter([
    {path: "/", element: <Main/>},
    {path: "/login", element: <Login/>},
    {path: "/nav", element: <Navbar/>}
]);
  