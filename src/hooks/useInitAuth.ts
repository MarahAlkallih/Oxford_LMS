import { useEffect, useState } from "react";
import { refreshAuth } from "../api/baseApi";

export const useInitAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          setIsAuthenticated(false);
          return;
        }

        const res = await refreshAuth();

        if (!isMounted) return;

        setIsAuthenticated(!!res.data);
      } catch {
        if (!isMounted) return;
        setIsAuthenticated(false);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoading, isAuthenticated };
};