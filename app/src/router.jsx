import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Login from "./pages/login.jsx";
import Welcome from "./pages/welcome.jsx";
import Main from "./pages/main.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  { path: "/login", element: <Login /> },
  {
    path: "/main",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
]);
