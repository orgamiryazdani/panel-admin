import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { getAccessToken } from "../../services/authService";
import Loading from "../common/Loading";
import AlertMessage from "../common/Alert";

const cookies = new Cookies();

const AuthGuard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) {
      setIsLoading(false);
      return;
    }

    const refreshAccessToken = async () => {
      try {
        await getAccessToken(refreshToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to refresh access token", error);
        <AlertMessage
          title='test'
          description='test'
        />;
      } finally {
        setIsLoading(false);
      }
    };

    refreshAccessToken();
  }, []);

  if (isLoading) {
    return (
      <div className='w-svw h-svh flex items-center justify-center'>
        <Loading
          width='120'
          height='90'
        />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />;
};

export default AuthGuard;
