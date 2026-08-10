importScripts(
  "https://www.gstatic.com/firebasejs/12.17.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging-compat.js"
);

firebase.initializeApp({

  apiKey:
    "AIzaSyBKHJEeLkkTRc_X6E_ZMaBqGyGkwO87-zo",

  authDomain:
    "debryne-update.firebaseapp.com",

  databaseURL:
    "https://debryne-update-default-rtdb.firebaseio.com",

  projectId:
    "debryne-update",

  storageBucket:
    "debryne-update.firebasestorage.app",

  messagingSenderId:
    "218054789442",

  appId:
    "1:218054789442:web:f891b9a9cd22e7938260db",

  measurementId:
    "G-1LNK265F45"

});

const messaging =
  firebase.messaging();

messaging.onBackgroundMessage(
  function(payload) {

    console.log(
      "Background notification received:",
      payload
    );

    const notificationTitle =
      payload.notification?.title ||
      "DeBryne Update";

    const notificationOptions = {

      body:
        payload.notification?.body ||
        "You have a new update from DeBryne Update.",

      icon:
        "./file_000000008e5c71f4a9d057362a556762.png"

    };

    self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );

  }
);
