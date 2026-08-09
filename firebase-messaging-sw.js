importScripts(
  "https://www.gstatic.com/firebasejs/12.17.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDiv2PjGsMCOpmTqBKzbydWUsFOP36fFtM",
  authDomain: "debryne-match-alert-a2d51.firebaseapp.com",
  databaseURL: "https://debryne-match-alert-a2d51-default-rtdb.firebaseio.com",
  projectId: "debryne-match-alert-a2d51",
  storageBucket: "debryne-match-alert-a2d51.firebasestorage.app",
  messagingSenderId: "967179671646",
  appId: "1:967179671646:web:0cbf28b0f57a146ca2bccf"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  console.log("Background message:", payload);

  const title =
    payload.notification?.title ||
    "DeBryne Match Alert";

  const body =
    payload.notification?.body ||
    "New match update!";

  self.registration.showNotification(title, {
    body: body,
    icon: "/DeBryne-Match-Alert-/icon.png",
    badge: "/DeBryne-Match-Alert-/icon.png"
  });

});
