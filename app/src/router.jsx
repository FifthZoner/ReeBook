import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Login from "./pages/login.jsx";
import Welcome from "./pages/welcome.jsx";
import Main from "./pages/main.jsx";
import Borrow from "./pages/borrow.jsx";
import Lend from "./pages/lend.jsx";


export const router = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  { path: "/login", element: <Login /> },
  {
    path: "/books",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lent",
    element: (
      <ProtectedRoute>
        <Lend />
      </ProtectedRoute>
    ),
  },
  {
    path: "/borrowed",
    element: (
      <ProtectedRoute>
        <Borrow />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
]);
