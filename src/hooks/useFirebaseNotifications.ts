import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase";
import { useSaveTokenMutation } from "../services/notifications/notificationMutation"; // استبدل المسار بحسب مكان الملف لديك

const vapidKey =
  "BNSTzELthmleBu-BxFr2Z7SJmqkYrPCJh15_XpQa4SZln0oT_Fe_m7TTTOfSbv8GuXcmwpXskBVd3BM4m2gPMuA";

export const useFirebaseNotifications = () => {
  const [saveToken] = useSaveTokenMutation();

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          console.log("Notification permission denied");
          return;
        }

        const token = await getToken(messaging, {
          vapidKey,
        });

        if (token) {
          console.log("Firebase Token:", token);

       
          await saveToken({
            data: {
              token: token,
              deviceType: "WEB",
            },
          }).unwrap();

          console.log("FCM Token saved to backend successfully.");
        } else {
          console.log("No registration token available.");
        }
      } catch (err) {
        console.error("Error setting up notifications:", err);
      }
    };

    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground Message:", payload);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [saveToken]);
};