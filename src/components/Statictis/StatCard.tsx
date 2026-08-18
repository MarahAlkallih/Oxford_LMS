import React from "react";
import cir from "../../assets/c-1.png";
import cir2 from "../../assets/c-2.png";

interface StatCardProps {
  title?: string;
  value?: string | number;
  subtext?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title = "Students",
  value = "500",
  subtext = "15% increased",
  icon,
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-r from-(--sec-color) to-(--third-color) w-72 h-44 shadow-sm select-none">
      
      {/* 1. الدوائر بالزوايا */}
      <img
        src={cir}
        alt="circle background bottom left"
        className="absolute -bottom-8 -left-8 w-44 h-44 object-contain pointer-events-none z-0 opacity-80"
      />
      <img
        src={cir2}
        alt="circle background top right"
        className="absolute -top-10 -right-8 w-52 h-52 object-contain pointer-events-none z-0 opacity-80"
      />

      {/* 2. الطبقة الشفافة فوق الدوائر (Transparent Overlay) */}
      <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-[2px]  z-0" />

      {/* 3. المحتوى العلوي الكارد */}
      <div className="relative z-10 flex flex-col justify-between h-full text-[#1c241b]">
        {/* Header: Title & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-normal tracking-wide text-gray-900">
            {title}
          </span>
          <div>
            {icon || (
              <svg
                className="w-6 h-6 text-gray-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            )}
          </div>
        </div>

        {/* Body: Value & Trend Subtext */}
        <div className="space-y-1">
          <div className="text-3xl font-medium text-gray-900 leading-none">
            {value}
          </div>
          <div className="text-xs text-gray-800/90 font-normal">
            {subtext}
          </div>
        </div>
      </div>
    </div>
  );
};