const NodeHelper = require("node_helper");
const gpsd = require("node-gpsd");

module.exports = NodeHelper.create({
  // Subclass start method.
  start: function () {
    var self = this;
    console.log("Starting node helper for: " + self.name);

    var listener = new gpsd.Listener({
      port: 2947,
      hostname: "localhost",
      parse: false,
    });

    listener.connect(function () {
      console.log("GPSD Connected");
    });

    listener.on("raw", function (data) {
      console.log(data);
    });

    listener.watch({ class: "WATCH", nmea: true });
  },
});
