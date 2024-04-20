import { createBrowserRouter } from 'react-router-dom';
import Hero from './ui/hero.jsx';
import SignInSide from './pages/signIn.jsx';

export const router = createBrowserRouter([
    {path: "/", element: <Hero/>},
    {path: "/signIn", element: <SignInSide/>}
  ]);
  