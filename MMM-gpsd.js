/* Magic Mirror
 * Module: MMM-gpsd
 *
 * MIT Licensed.
 */
Module.register("MMM-gpsd", {
  // Default module config.
  defaults: {
    port: 2947,
    hostname: "localhost",
    text: "GPSD!!!!",
  },

  start: function () {
    console.log("Starting module: " + this.name);

    this.gpsData = {};

    this.setGpsdConnection();
  },

  setGpsdConnection: function () {
    this.sendSocketNotification("GPSD_CONNECT", {
      port: this.config.port,
      hostname: this.config.hostname,
    });
  },
  socketNotificationReceived: function (notification, payload) {
    console.log(notification);
    console.log(payload);
  },

  getTemplate: function () {
    return "MMM-gpsd.njk";
  },

  getTemplateData: function () {
    return {
      config: this.config,
      current: this.gpsData,
    };
  },
});
