import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import http from "../../services/httpService";

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
        const response = await http.post("/auth/refresh-token", { refreshToken });
        const { access_token } = response.data;
        
        cookies.set("accessToken", access_token, { path: "/" });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to refresh access token", error);
      } finally {
        setIsLoading(false);
      }
    };

    refreshAccessToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // یا هر محتوای دیگر برای نشان دادن وضعیت بارگذاری
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default AuthGuard;
