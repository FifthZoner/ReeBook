import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isLogged = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/checkSession", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        });
        if (response.status === 401) {
          console.log("User session is not valid!");
          setIsAuthenticated(false);
        } else if (response.status === 200) {
          console.log("Session is valid!");
          setIsAuthenticated(true);
        } else {
          console.log("Error when checking session!");
        }
      } catch (err) {
        setError("Error when checking session!");
      }
      setIsLoading(false);
    };

    isLogged();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
