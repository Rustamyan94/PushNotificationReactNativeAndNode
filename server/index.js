const express = require("express");
const { admin } = require("./firebase-config");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Server!");
});
app.get("/test", (req, res) => {
  const message = {
    notification: {
      title: "Test notifcation title",
      body: "Test notifcation body",
    },
  };
  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  admin
    .messaging()
    .sendToDevice(process.env.ANDROID_DEVICE_TOKEN, message, options)
    .then((response) => {
      console.log("Notification sent successfully", response.results);
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      console.log("catch - ", error);
      res.end();
    });
});
app.listen(port, () => {
  console.log("listening to port" + port);
});
