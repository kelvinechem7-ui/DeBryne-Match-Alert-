<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Debryne Match Alert - Live</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #080b10;
  color: white;
}

.container {
  max-width: 500px;
  margin: auto;
  padding: 25px 15px 40px;
}

.brand {
  text-align: center;
  color: #f5c542;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 15px;
}

.live {
  text-align: center;
  color: #72e28b;
  font-weight: bold;
  margin-bottom: 12px;
}

.viewer-count {
  text-align: center;
  color: #b8c0c9;
  font-size: 13px;
  margin-bottom: 15px;
}

.card {
  background: #151b23;
  border: 1px solid #29323d;
  border-radius: 20px;
  padding: 25px 18px;
}

.competition {
  text-align: center;
  color: #9da7b3;
  font-size: 13px;
  letter-spacing: 1px;
}

h1 {
  text-align: center;
  font-size: 22px;
  margin: 10px 0 30px;
}

.teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.team {
  width: 35%;
  font-weight: bold;
  font-size: 15px;
}

.score {
  font-size: 38px;
  font-weight: 900;
}

.status {
  text-align: center;
  margin: 25px 0 15px;
  font-weight: bold;
  color: #72e28b;
}

.timer {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #f5c542;
  margin: 15px 0;
}

.details {
  text-align: center;
  color: #b8c0c9;
  line-height: 1.8;
  font-size: 14px;
}

.alert {
  margin-top: 20px;
  padding: 15px;
  border-radius: 12px;
  background: #202934;
  text-align: center;
}

.notify {
  width: 100%;
  margin-top: 15px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #f5c542;
  color: #111;
  font-size: 15px;
  font-weight: bold;
}

.notify.on {
  background: #72e28b;
}

.connection {
  text-align: center;
  margin-top: 15px;
  font-size: 12px;
}

.footer {
  text-align: center;
  margin-top: 25px;
  color: #68727e;
  font-size: 12px;
}

</style>

</head>

<body>

<div class="container">

  <div class="brand">
    DEBRYNE UPDATE
  </div>

  <div class="live">
    🔴 LIVE MATCH CENTRE
  </div>

  <div class="viewer-count" id="viewerCount">
    👀 LIVE VIEWERS: 0
  </div>

  <div class="card">

    <div class="competition">
      COMPUTER SCIENCE
    </div>

    <h1>
      🏆 SEND-FORTH MATCH
    </h1>

    <div class="teams">

      <div class="team">
        ND1 + HND1
      </div>

      <div class="score">
        <span id="homeScore">0</span>
        —
        <span id="awayScore">0</span>
      </div>

      <div class="team">
        ND2 + HND2
      </div>

    </div>

    <div class="status" id="status">
      🟢 MATCH NOT STARTED
    </div>

    <div class="timer" id="timer">
      ⏱️ 00:00
    </div>

    <div class="details">
      📅 Sunday, August 9, 2026<br>
      ⏰ 3:00 PM<br>
      📍 School Multipurpose Field
    </div>

    <div class="alert" id="alert">
      🔔 Waiting for match updates...
    </div>

    <button class="notify" id="notifyBtn">
      🔔 TURN ON MATCH NOTIFICATIONS
    </button>

  </div>

  <div class="connection" id="connection">
    🟡 CONNECTING...
  </div>

  <div class="footer">
    Powered by Debryne Update
  </div>

</div>


<script type="module">

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  onDisconnect,
  set
}
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";

import {
  getMessaging,
  getToken,
  onMessage
}
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging.js";


const firebaseConfig = {

  apiKey:
    "AIzaSyDiv2PjGsMCOpmTqBKzbydWUsFOP36fFtM",

  authDomain:
    "debryne-match-alert-a2d51.firebaseapp.com",

  databaseURL:
    "https://debryne-match-alert-a2d51-default-rtdb.firebaseio.com",

  projectId:
    "debryne-match-alert-a2d51",

  storageBucket:
    "debryne-match-alert-a2d51.firebasestorage.app",

  messagingSenderId:
    "967179671646",

  appId:
    "1:967179671646:web:0cbf28b0f57a146ca2bccf",

  measurementId:
    "G-R2TYPHXC37"
};


const app =
  initializeApp(firebaseConfig);

const db =
  getDatabase(app);

const messaging =
  getMessaging(app);


const homeScore =
  document.getElementById("homeScore");

const awayScore =
  document.getElementById("awayScore");

const statusDisplay =
  document.getElementById("status");

const timerDisplay =
  document.getElementById("timer");

const alertDisplay =
  document.getElementById("alert");

const viewerCountDisplay =
  document.getElementById("viewerCount");

const connection =
  document.getElementById("connection");

const notifyBtn =
  document.getElementById("notifyBtn");


/* MATCH */

const matchRef =
  ref(db, "match");

let timerSeconds = 0;
let timerRunning = false;


function formatTime(seconds) {

  const minutes =
    Math.floor(seconds / 60);

  const secs =
    seconds % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0")
  );

}


function updateTimer() {

  timerDisplay.textContent =
    "⏱️ " +
    formatTime(timerSeconds);

}


onValue(matchRef, (snapshot) => {

  const data = snapshot.val();

  connection.textContent =
    "🟢 LIVE DATABASE CONNECTED";

  if (!data) return;

  homeScore.textContent =
    data.homeScore || 0;

  awayScore.textContent =
    data.awayScore || 0;

  statusDisplay.textContent =
    data.status ||
    "🟢 MATCH NOT STARTED";

  alertDisplay.textContent =
    data.alert ||
    "🔔 Waiting for match updates...";

  timerSeconds =
    Number(data.timerSeconds || 0);

  timerRunning =
    data.timerRunning === true;

  updateTimer();

});


setInterval(() => {

  if (timerRunning) {

    timerSeconds++;

    updateTimer();

  }

}, 1000);


/* VIEWER COUNTER */

const viewerId =
  crypto.randomUUID();

const viewerRef =
  ref(db, "viewers/" + viewerId);

set(viewerRef, {
  online: true,
  joinedAt: Date.now()
});

onDisconnect(viewerRef).remove();


onValue(
  ref(db, "viewers"),
  (snapshot) => {

    const data =
      snapshot.val();

    const count =
      data
        ? Object.keys(data).length
        : 0;

    viewerCountDisplay.textContent =
      "👀 LIVE VIEWERS: " + count;

  }
);


/* NOTIFICATIONS */

const VAPID_KEY =
  "BLt5HsK2VS9ZE6qMXps4dWs67MoX25gn-gwswsJ0ID8wAwYw31NASvlB_KshmihU2OVcHnXuXmc3BjT88Ny21NY";


notifyBtn.addEventListener(
  "click",
  async () => {

    notifyBtn.disabled = true;

    notifyBtn.textContent =
      "⏳ SETTING UP...";

    try {

      if (!("Notification" in window)) {

        throw new Error(
          "This browser does not support notifications."
        );

      }


      const permission =
        await Notification.requestPermission();


      if (permission !== "granted") {

        throw new Error(
          "Notification permission was not granted."
        );

      }


      /*
       * IMPORTANT:
       * The service worker is inside
       * the same GitHub Pages folder.
       */

      const registration =
        await navigator.serviceWorker.register(
          "/DeBryne-Match-Alert-/firebase-messaging-sw.js"
        );


      console.log(
        "Service worker registered:",
        registration.scope
      );


      await navigator.serviceWorker.ready;


      const token =
        await getToken(
          messaging,
          {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration:
              registration
          }
        );


      if (!token) {

        throw new Error(
          "Firebase did not return a notification token."
        );

      }


      console.log(
        "Notification token:",
        token
      );


      /*
       * Save token.
       *
       * This requires your Firebase
       * database rules to allow this write.
       */

      await set(
        ref(
          db,
          "notificationTokens/" +
          encodeURIComponent(token)
        ),
        {
          token: token,
          createdAt: Date.now()
        }
      );


      notifyBtn.disabled = false;

      notifyBtn.textContent =
        "🔔 NOTIFICATIONS ON";

      notifyBtn.classList.add("on");


      alert(
        "✅ Match notifications are ON!"
      );

    }

    catch (error) {

      console.error(
        "NOTIFICATION ERROR:",
        error
      );


      notifyBtn.disabled = false;

      notifyBtn.textContent =
        "🔔 TRY AGAIN";


      alert(
        "❌ NOTIFICATION ERROR\n\n" +
        "Name: " +
        (error.name || "Unknown") +
        "\n\nMessage:\n" +
        (error.message || error)
      );

    }

  }
);


/* FOREGROUND MESSAGE */

onMessage(
  messaging,
  (payload) => {

    console.log(
      "Foreground message:",
      payload
    );

    const title =
      payload.notification?.title ||
      "DeBryne Match Alert";

    const body =
      payload.notification?.body ||
      "New match update!";

    alertDisplay.textContent =
      "🔔 " + body;

  }
);


updateTimer();

</script>

</body>
</html>
