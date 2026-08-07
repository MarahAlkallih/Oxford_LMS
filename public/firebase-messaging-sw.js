importScripts(
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyABqDM2DoOlLE3mYEPk9mG9UXFD6cXuyIU",
  authDomain: "oxford-lms.firebaseapp.com",
  projectId: "oxford-lms",
  storageBucket: "oxford-lms.firebasestorage.app",
  messagingSenderId: "567293295292",
  appId: "1:567293295292:web:c4a5bdcda0cf7a3f87aeb9",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);

  self.registration.showNotification(
    payload.notification?.title || "Notification",
    {
      body: payload.notification?.body,
      icon: "/logo192.png",
    }
  );
});