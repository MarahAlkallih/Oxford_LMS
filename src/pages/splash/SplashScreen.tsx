import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInitAuth } from "../../hooks/useInitAuth";

const MIN_SPLASH_TIME = 5000;

const SplashScreen = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useInitAuth();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isLoading) {
      timeout = setTimeout(() => {
        if (isAuthenticated) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      }, MIN_SPLASH_TIME);
    }

    return () => clearTimeout(timeout);
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <div className="h-screen flex flex-col items-center bg-bg-[#4B5945] justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-pink-500 rounded-full mb-4" />
      <p>Checking session...</p>
    </div>
  );
};

export default SplashScreen;