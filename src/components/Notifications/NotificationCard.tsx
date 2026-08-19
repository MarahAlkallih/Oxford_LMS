// // components/notifications/NotificationCard.tsx
// import React from "react";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import type { NotificationItem } from "../../types/notification";

// interface NotificationCardProps {
//   notification: NotificationItem;
//   onMarkAsRead: (id: number) => void;
//   onNavigate?: (route?: string) => void;
// }

// export const NotificationCard: React.FC<NotificationCardProps> = ({
//   notification,
//   onMarkAsRead,
//   onNavigate,
// }) => {
//   const isUnread = !notification.readAt;

//   // فك تشفير حقل الـ data إذا كان يحتوي على مسار
//   let route: string | undefined;
//   try {
//     if (notification.data) {
//       const parsedData = JSON.parse(notification.data);
//       route = parsedData.route;
//     }
//   } catch (e) {
//     console.error("Failed to parse notification data", e);
//   }

//   // تنسيق تاريخ وتوقيت الإشعار
//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("ar-EG", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleClick = () => {
//     if (isUnread) {
//       onMarkAsRead(notification.id);
//     }
//     if (route && onNavigate) {
//       onNavigate(route);
//     }
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className={`relative flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
//         isUnread
//           ? "bg-emerald-50/50 border-emerald-200/80 hover:bg-emerald-50 shadow-2xs"
//           : "bg-white border-gray-150 hover:bg-gray-50/80"
//       }`}
//     >
//       {/* مؤشر الإشعار غير المقروء (دائرة خضراء) */}
//       {isUnread && (
//         <span className="absolute top-4 left-4 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
//       )}

//       {/* أيقونة أو صورة الإشعار */}
//       <div
//         className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
//           isUnread
//             ? "bg-emerald-100 text-emerald-700 border-emerald-200"
//             : "bg-gray-100 text-gray-500 border-gray-200"
//         }`}
//       >
//         {notification.image ? (
//           <img
//             src={notification.image}
//             alt="notification"
//             className="w-full h-full object-cover rounded-xl"
//           />
//         ) : (
//           <NotificationsIcon fontSize="small" />
//         )}
//       </div>

//       {/* تفاصيل الإشعار */}
//       <div className="flex-1 min-w-0 pr-1">
//         <div className="flex items-center justify-between gap-2 mb-1">
//           <h4
//             className={`text-sm font-bold truncate ${
//               isUnread ? "text-gray-900" : "text-gray-700"
//             }`}
//           >
//             {notification.title}
//           </h4>

//           <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 shrink-0">
//             <AccessTimeIcon sx={{ fontSize: 13 }} />
//             {formatDate(notification.createdAt)}
//           </span>
//         </div>

//         <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
//           {notification.body}
//         </p>

//         {notification.subTitle && (
//           <p className="text-[11px] text-gray-400 mt-1">{notification.subTitle}</p>
//         )}
//       </div>

//       {/* زر تعليم كمقروء عند التحويم */}
//       {isUnread && (
//         <button
//           type="button"
//           onClick={(e) => {
//             e.stopPropagation();
//             onMarkAsRead(notification.id);
//           }}
//           className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-100/60 rounded-lg transition-colors shrink-0"
//           title="تحديد كمقروء"
//         >
//           <CheckCircleOutlineIcon fontSize="small" />
//         </button>
//       )}
//     </div>
//   );
// };