import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface StatCardProps {
  title: string;
  value: string | number;
  percentage: number; 
  icon: React.ReactNode;
  trend?: string;
  isPositive?: boolean;
  variant?: "main" | "second"; 
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
  icon,
  trend,
  isPositive = true,
  variant = "main",
}) => {
  // تحديد لون المتغير بناءً على الـ variant المختار
  const primaryColorVar =
    variant === "main"
      ? "var(--main-color)"
      : "var(--second-color, var(--color-watermelon))";

  // حسابات الدائرة البرمجية (SVG Calculations)
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4">
      
      {/* القسم الأيسر: النصوص والأيقونة */}
      <div className="space-y-2">
        {/* خلفية الأيقونة تأخذ درجة شفافة وخفيفة من لون الثيم المختار */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors"
          style={{
            backgroundColor: `color-mix(in srgb, ${primaryColorVar} 10%, transparent)`,
            borderColor: `color-mix(in srgb, ${primaryColorVar} 25%, transparent)`,
            color: primaryColorVar,
          }}
        >
          {icon}
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{value}</h3>
        </div>

        {/* مؤشر التغير (الزيادة/النقصان) */}
        {trend && (
          <div className="flex items-center gap-1 text-xs font-bold">
            <span className={isPositive ? "text-emerald-600" : "text-rose-600"}>
              {isPositive ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : <TrendingDownIcon sx={{ fontSize: 16 }} />}
              {trend}
            </span>
            <span className="text-gray-400 font-medium">vs last month</span>
          </div>
        )}
      </div>

      {/* القسم الأيمن: دائرة النسب المئوية */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg className="w-20 h-20 transform -rotate-90">
          {/* خلفية الدائرة الرمادية الخفيفة */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="7"
            fill="transparent"
          />
          {/* رسم الدائرة بلون متغر الهوية المختار */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={primaryColorVar}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* النص داخل منتصف الدائرة */}
        <span className="absolute text-xs font-bold text-gray-700">
          {percentage}%
        </span>
      </div>

    </div>
  );
};