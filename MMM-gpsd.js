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
  },

  setGpsdConnection: function () {
    this.sendSocketNotification("GPSD_CONNECT", {
      port: this.config.port,
      hostname: this.config.hostname,
    });
  },

  socketNotificationReceived: function (notification, payload) {
    console.log(payload);

    if (payload.id !== this.identifier) {
      // not for this module
      return;
    }

    if (notification === "GPSD_ERROR") {
      this.errorMessage =
        "Error " +
        payload.error.statusCode +
        "(" +
        payload.error.statusMessage +
        "): " +
        payload.error.responseBody;
      Log.error(this.errorMessage);
    }
    if (notification === "GPSD_DATA") {
      this.error = false;

      this.gpsData = payload.data;
      console.log(this.gpsData);
      this.updateDom(5);
    }
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
