const NodeHelper = require("node_helper");
const gpsd = require("node-gpsd");

module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "GPSD_CONNECT") {
      this.gpsdConnect(payload.port, payload.hostname);
    }
  },

  gpsdConnect: function (port, hostname) {
    var self = this;

    var listener = new gpsd.Listener({
      port: port,
      hostname: hostname
    });

    listener.connect(function () {
      console.log("GPSD Connected");
    });

    listener.on("TPV", function (data) {
      self.sendSocketNotification("GPSD_DATA", data);
    });

    listener.watch({ class: "WATCH", json: true });
  }
});
