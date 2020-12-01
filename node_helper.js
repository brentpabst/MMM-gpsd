const NodeHelper = require("node_helper");
const gpsd = require("node-gpsd");

module.exports = NodeHelper.create({
  // Subclass start method.
  start: function () {
    var self = this;
    console.log("Starting node helper for: " + self.name);
  },
  socketNotificationReceived: function (notification, payload) {
    var self = this;

    if (notification === "GPSD_CONNECT") {
      self.gpsdConnect(payload.port, payload.hostname);
    }
  },

  gpsdConnect: function (port, hostname) {
    var self = this;

    if (port === "") {
      var error = {
        statusCode: 400,
        statusMessage: "gpsd port is empty",
        responseBody: "Please add it.",
      };
      self.sendSocketNotification("GPSD_ERROR", {
        id: this.identifier,
        error: error,
      });
      return;
    }

    if (hostname === "") {
      var error = {
        statusCode: 400,
        statusMessage: "gpsd hostname is empty",
        responseBody: "Please add it.",
      };
      self.sendSocketNotification("GPSD_ERROR", {
        id: this.identifier,
        error: error,
      });
      return;
    }

    var listener = new gpsd.Listener({
      port: port,
      hostname: hostname,
    });

    listener.connect(function () {
      console.log("GPSD Connected");
    });

    listener.on("TPV", function (data) {
      console.log("Got data from GPSD! %j", data);
      self.sendSocketNotification("GPSD_DATA", {
        data: data,
      });
    });

    listener.watch({ class: "WATCH", json: true });
  },
});
