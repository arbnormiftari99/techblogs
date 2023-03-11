var admin = require("firebase-admin");

var serviceAccount = require("../private-key.json");

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = adminApp;