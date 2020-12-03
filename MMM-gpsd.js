/* Magic Mirror
 * Module: MMM-gpsd
 *
 * MIT Licensed.
 */
Module.register("MMM-gpsd", {
  // Default module config.
  defaults: {
    header: "GPS Details",

    units: config.units,
    timeFormat: 12,

    port: 2947,
    hostname: "localhost",

    debug: false,
    showDevice: false,
    showMode: false,
    showSats: true
  },

  start: function () {
    Log.log("Starting module: " + this.name);

    // Add custom filters
    this.addFilters();

    this.gpsDeviceData = null;
    this.gpsSkyData = null;

    this.setGpsdConnection();
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "GPSD_DEVICE_DATA") {
      // Handle no movement
      if (!payload.speed) {
        payload.speed = 0;
      }
      this.gpsDeviceData = { ...this.gpsData, ...payload };
      this.updateDom();
    }

    if (notification === "GPSD_SKY_DATA") {
      this.gpsSkyData = { ...this.gpsSkyData, ...payload };
      this.updateDom();
    }
  },

  setGpsdConnection: function () {
    this.sendSocketNotification("GPSD_CONNECT", {
      port: this.config.port,
      hostname: this.config.hostname
    });
  },

  getTemplate: function () {
    return "MMM-gpsd.njk";
  },

  getTemplateData: function () {
    return {
      config: this.config,
      gps: this.gpsDeviceData,
      sky: this.gpsSkyData
    };
  },

  getHeader: function () {
    return this.config.header;
  },

  addFilters() {
    this.nunjucksEnvironment().addFilter(
      "roundValue",
      function (value) {
        return Math.round(value);
      }.bind(this)
    );

    this.nunjucksEnvironment().addFilter(
      "gpsMode",
      function (mode) {
        if (mode === 0) {
          return "Not Active";
        } else if (mode === 1) {
          return "Acquiring Fix";
        } else if (mode === 2) {
          return "2D Fix";
        } else if (mode === 3) {
          return "3D Fix";
        }
      }.bind(this)
    );

    this.nunjucksEnvironment().addFilter(
      "speed",
      function (speed) {
        if (this.config.units === "metric") {
          speed = Math.round(speed * 3.6); // mps to kph
          speed += " kph";
        } else if (this.config.units === "imperial") {
          speed = Math.round(speed * 2.23693629); // mps to mph
          speed += " mph";
        } else {
          speed += " mps";
        }
        return speed;
      }.bind(this)
    );

    this.nunjucksEnvironment().addFilter(
      "formatTime",
      function (date) {
        date = moment(date);

        if (this.config.timeFormat !== 24) {
          return date.format("h:mm:ss a");
        } else {
          return date.format("h:mm:ss");
        }
      }.bind(this)
    );

    this.nunjucksEnvironment().addFilter(
      "direction",
      function (direction) {
        if (direction > 11.25 && direction <= 33.75) {
          return "NNE";
        } else if (direction > 33.75 && direction <= 56.25) {
          return "NE";
        } else if (direction > 56.25 && direction <= 78.75) {
          return "ENE";
        } else if (direction > 78.75 && direction <= 101.25) {
          return "E";
        } else if (direction > 101.25 && direction <= 123.75) {
          return "ESE";
        } else if (direction > 123.75 && direction <= 146.25) {
          return "SE";
        } else if (direction > 146.25 && direction <= 168.75) {
          return "SSE";
        } else if (direction > 168.75 && direction <= 191.25) {
          return "S";
        } else if (direction > 191.25 && direction <= 213.75) {
          return "SSW";
        } else if (direction > 213.75 && direction <= 236.25) {
          return "SW";
        } else if (direction > 236.25 && direction <= 258.75) {
          return "WSW";
        } else if (direction > 258.75 && direction <= 281.25) {
          return "W";
        } else if (direction > 281.25 && direction <= 303.75) {
          return "WNW";
        } else if (direction > 303.75 && direction <= 326.25) {
          return "NW";
        } else if (direction > 326.25 && direction <= 348.75) {
          return "NNW";
        } else {
          return "N";
        }
      }.bind(this)
    );
  }
});
