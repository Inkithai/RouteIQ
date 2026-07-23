const admin = require("firebase-admin");

if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("🔥 Firebase Admin FCM initialized");
  } catch (err) {
    console.warn("FCM Initialization Warning:", err.message);
  }
}

async function sendProximityNotification({ deviceToken, busNumber, stopName, stopsAway = 2 }) {
  const payload = {
    notification: {
      title: `🚌 Bus ${busNumber} Approaching!`,
      body: `Your bus is now ${stopsAway} stops away from ${stopName}. Get ready to board!`,
    },
    data: {
      type: "BUS_PROXIMITY_ALERT",
      busNumber: String(busNumber),
      stopName: String(stopName),
    },
  };

  if (deviceToken && admin.apps.length > 0) {
    try {
      await admin.messaging().send({
        token: deviceToken,
        ...payload,
      });
      console.log(`✅ FCM Push Notification dispatched to token ${deviceToken.slice(0, 10)}...`);
      return true;
    } catch (err) {
      console.error("FCM dispatch error:", err.message);
    }
  }

  console.log(`📡 Broadcasted Proximity Alert: Bus ${busNumber} is ${stopsAway} stops away from ${stopName}`);
  return false;
}

module.exports = { sendProximityNotification };
