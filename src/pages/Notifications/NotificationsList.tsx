import React from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  useGetUnreadCountQuery,
  useGetNotificationsQuery,
} from "../../services/notifications/notificationQuery";
import {
  useMarkAsReadMutation,
  useMarkAsReadAllMutation,
} from "../../services/notifications/notificationMutation";
import { NotificationCard } from "../../components/Notifications/NotificationCard";

export const NotificationsList: React.FC = () => {
  const { data: notificationsData, isLoading } = useGetNotificationsQuery({});
  const { data: unreadData } = useGetUnreadCountQuery();
 
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAsReadAllMutation();

  // جلب كافة الإشعارات (المقروءة وغير المقروءة)
  const notifications = notificationsData?.data || [];
  const unreadCount = unreadData?.unreadCount ?? 0;
 console.log("notee",notifications)
  const handleMarkAsRead = (id: number) => {
    markAsRead({ id });
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead({});
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-150 rounded-3xl p-8 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-400 font-semibold">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs space-y-5">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <NotificationsActiveIcon className="text-emerald-600" />
          <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
          {unreadCount > 0 && (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {unreadCount} unread
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-200 transition-all cursor-pointer"
          >
            <DoneAllIcon fontSize="small" />
           Mark All as read
          </button>
        )}
      </div>

      {/* Notifications List - يعرض كافة الإشعارات */}
      {notifications.length === 0 ? (
        <div className="p-10 border-2 border-dashed border-gray-200 rounded-2xl text-center bg-gray-50/50">
          <p className="text-sm text-gray-400 font-semibold">Are not Notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {notifications.map((item) => (
            <NotificationCard
              key={item.id}
              notification={item}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};