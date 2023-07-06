var admin = require("firebase-admin");

var serviceAccount = require("./pushnotification-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.admin = admin;
