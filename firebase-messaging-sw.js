importScripts(
  "https://www.gstatic.com/firebasejs/12.17.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging-compat.js"
);


/* =========================
   FIREBASE CONFIG
========================= */

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
    "1:218054789442:web:f891b9a9cd22e7938260db"

});


const messaging =
  firebase.messaging();


/* =========================
   BACKGROUND NOTIFICATIONS
========================= */

messaging.onBackgroundMessage(
  function(payload) {

    console.log(
      "Background FCM message:",
      payload
    );


    const notification =
      payload.notification || {};

    const data =
      payload.data || {};


    const title =
      notification.title ||
      data.title ||
      "DeBryne Update";


    const body =
      notification.body ||
      data.body ||
      "You have a new update from DeBryne Update.";


    const options = {

      body: body,

      icon:
        "./file_000000008e5c71f4a9d057362a556762.png",

      badge:
        "./file_000000008e5c71f4a9d057362a556762.png",

      data: {

        ...data,

        url:
          data.url ||
          "./"

      }

    };


    return self.registration.showNotification(
      title,
      options
    );

  }
);


/* =========================
   NOTIFICATION CLICK
========================= */

self.addEventListener(
  "notificationclick",
  function(event) {

    console.log(
      "Notification clicked."
    );


    event.notification.close();


    const notificationData =
      event.notification.data || {};


    const targetUrl =
      notificationData.url ||
      "./";


    event.waitUntil(

      clients.matchAll({

        type: "window",

        includeUncontrolled: true

      })

      .then(function(clientList) {


        /*

        If DeBryne Update is
        already open, focus it.

        */

        for(
          const client of clientList
        ) {

          if(
            "focus" in client
          ) {

            return client.focus();

          }

        }


        /*

        Otherwise open
        DeBryne Update.

        */

        if(
          clients.openWindow
        ) {

          return clients.openWindow(
            targetUrl
          );

        }

      })

    );

  }
);
