const express = require("express");
const { admin } = require("./firebase-config");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Server!");
});
app.get("/test", async (req, res) => {
  const message = {
    notification: {
      title: "Test notifcation title",
      body: "Test notifcation body",
    },
  };

  const options = {
    contentAvailable: true,
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  await admin
    .messaging()
    .sendToDevice(process.env.IOS_DEVICE_TOKEN, message, options)
    .then((response) => {
      console.log("Notification sent successfully", response.results);
      res
        .status(200)
        .send(
          `Notification sent successfully \n ${JSON.stringify(
            response.results[0]
          )}`
        );
    })
    .catch((error) => {
      console.log("catch - ", error);
      res
        .status(400)
        .send(
          `Notification sent failed \n ${JSON.stringify(error.results[0])}`
        );
    });
});
app.listen(port, () => {
  console.log("listening to port" + port);
});
