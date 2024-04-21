import { createBrowserRouter } from 'react-router-dom';
import SignInSide from './pages/signIn.jsx';
import SignUpSide from './pages/signUp.jsx';
import Main from './pages/welcome.jsx';
import Navbar from './ui/navbar.jsx';

export const router = createBrowserRouter([
    {path: "/", element: <Main/>},
    {path: "/signIn", element: <SignInSide/>},
    {path: "/signUp", element: <SignUpSide/>},
    {path: "/nav", element: <Navbar/>}
]);
  