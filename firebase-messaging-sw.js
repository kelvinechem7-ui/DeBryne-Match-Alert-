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
"1:218054789442:web:f891b9a9cd22e7938260db"

});

const messaging =
firebase.messaging();

messaging.onBackgroundMessage(
function(payload) {

console.log(
  "Background FCM message:",
  payload
);


const title =
  payload.notification?.title ||
  payload.data?.title ||
  "DeBryne Update";


const body =
  payload.notification?.body ||
  payload.data?.body ||
  "You have a new update from DeBryne Update.";


const options = {

  body: body,

  icon:
    "./file_000000008e5c71f4a9d057362a556762.png",

  badge:
    "./file_000000008e5c71f4a9d057362a556762.png",

  data:
    payload.data || {}

};


return self.registration.showNotification(
  title,
  options
);

}
);

/*
When the user taps the notification,
open the DeBryne Update website.
*/

self.addEventListener(
"notificationclick",
function(event) {

event.notification.close();


event.waitUntil(

  clients.matchAll({

    type: "window",

    includeUncontrolled: true

  })

  .then(function(clientList) {

    for(
      const client of clientList
    ){

      if(
        "focus" in client
      ){

        return client.focus();

      }

    }


    if(
      clients.openWindow
    ){

      return clients.openWindow(
        "./"
      );

    }

  })

);

}
);
