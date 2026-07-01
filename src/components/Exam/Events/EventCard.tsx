import React from "react";
import type { Event } from "../../../types/Event";

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {

  const formatDateTime = (isoString: string) => {
    if (!isoString) return { date: "", time: "" };
    const dateObj = new Date(isoString);
    

    const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    const date = dateObj.toLocaleDateString('en-US', dateOptions);
    

    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const time = dateObj.toLocaleTimeString('en-US', timeOptions);
    
    return { date, time };
  };

  const startFormatted = formatDateTime(event.startDate);
  const endFormatted = formatDateTime(event.endDate);

  return (
    <div 
      className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-gray-200/80 transition-all duration-300 max-w-md w-full relative overflow-hidden"
      dir="ltr"
    >
      {/* تأثير بصري جانبي أنيق يأخذ لون الهوية */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-(--main-color,#4B5945) group-hover:bg-(--color-watermelon,#E07A5F) transition-colors duration-300" />

      {/* الرأس: الكود وأزرار التحكم (تعديل / حذف) */}
      <div className="flex items-center justify-between gap-4 mb-4 pl-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-(--main-color,#4B5945)/10 rounded-xl text-(--main-color,#4B5945)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.625 21h12.75A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.625 11.25h12.75A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold tracking-wider uppercase block leading-none">Exam Code</span>
            <span className="text-sm font-mono font-bold text-gray-800 mt-0.5 block">{event.exam.code}</span>
          </div>
        </div>

        {/* أزرار التحكم والتفاعل الجانبية */}
        <div className="flex items-center gap-1 bg-gray-50/80 p-1 rounded-xl border border-gray-100">
          {/* زر التعديل */}
          <button
            onClick={() => onEdit(event)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit Event"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>

          {/* زر الحذف */}
          <button
            onClick={() => onDelete(event.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="Delete Event"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* المحتوى الوسطي: عنوان الإيفنت الأساسي أو رقم الـ Instance */}
      <div className="pl-2 mb-4">
        <h3 className="text-gray-800 font-black text-lg group-hover:text-(--main-color,#4B5945) transition-colors duration-200">
          {event.exam.title || `Exam Instance #${event.examInstanceId}`}
        </h3>
        <p className="text-gray-400 text-xs mt-0.5">
          Event ID: <span className="font-mono">#evt-{event.id}</span>
        </p>
      </div>

      {/* خط الزمن والتوقيت الفخم (Timeline Grid) */}
      <div className="grid grid-cols-2 gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100/70 pl-2">
        {/* وقت البداية */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Starts
          </span>
          <span className="text-xs font-black text-gray-700 mt-1">{startFormatted.date}</span>
          <span className="text-[11px] text-gray-400 font-mono font-medium">{startFormatted.time}</span>
        </div>

        {/* وقت النهاية */}
        <div className="flex flex-col gap-0.5 border-l border-gray-200/60 pl-3">
          <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
            Ends
          </span>
          <span className="text-xs font-black text-gray-700 mt-1">{endFormatted.date}</span>
          <span className="text-[11px] text-gray-400 font-mono font-medium">{endFormatted.time}</span>
        </div>
      </div>
    </div>
  );
};