import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase";

const vapidKey =
  "BNSTzELthmleBu-BxFr2Z7SJmqkYrPCJh15_XpQa4SZln0oT_Fe_m7TTTOfSbv8GuXcmwpXskBVd3BM4m2gPMuA";

export const useFirebaseNotifications = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          console.log("Notification permission denied");
          return;
        }
        console.log("Messaging:", messaging);
        const token = await getToken(messaging, {
          vapidKey,
        });

        if (token) {
          console.log("Firebase Token:", token);

          // هون لاحقاً رح نبعتو للـ Backend
        } else {
          console.log("No registration token available.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log("Foreground Message:", payload);
    });
  }, []);
};