import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInitAuth } from "../../hooks/useInitAuth";
import logo from "../../assets/logo.png";

const MIN_SPLASH_TIME = 5000; // 5 ثوانٍ كحد أدنى إجمالي

const SplashScreen = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useInitAuth();
  
  // 1. حفظ وقت فتح الشاشة بدقة لمنع إعادة الحساب عند تحديث الـ State
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // إذا كان التحقق من الحساب لا يزال مستمراً، ننتظر ولا نفعل شيئاً
    if (isLoading) return;

    // 2. حساب الوقت المستغرق فعلياً في التحميل
    const elapsedTime = Date.now() - startTimeRef.current;
    
    // 3. حساب الوقت المتبقي فقط لتقفيل الـ 5 ثوانٍ
    const remainingTime = Math.max(0, MIN_SPLASH_TIME - elapsedTime);

    const timeout = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }, remainingTime);

    return () => clearTimeout(timeout);
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <div className="h-screen flex flex-col items-center bg-(--main-color) justify-center gap-6">
      {/* 4. عرض الشعار المستورد ليعطي هوية للتطبيق أثناء الانتظار */}
      <img 
        src={logo} 
        alt="App Logo" 
        className="w-32 h-auto object-contain animate-pulse" 
      />
      
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-(--color-watermelon) rounded-full" />
        <p className="text-sm font-medium text-gray-500">Checking session...</p>
      </div>
    </div>
  );
};

export default SplashScreen;