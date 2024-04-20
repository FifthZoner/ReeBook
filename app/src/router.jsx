import { createBrowserRouter } from 'react-router-dom';
import Hero from './ui/hero.jsx';
import SignInSide from './pages/signIn.jsx';
import SignUpSide from './pages/signUp.jsx';

export const router = createBrowserRouter([
    {path: "/", element: <Hero/>},
    {path: "/signIn", element: <SignInSide/>},
    {path: "/signUp", element: <SignUpSide/>}
  ]);
  