/* Magic Mirror
 * Module: MMM-gpsd
 *
 * MIT Licensed.
 */
Module.register("MMM-gpsd", {
  // Default module config.
  defaults: {
    text: "GPSD!!!!",
  },

  start: function () {
    Log.info("Starting module: " + this.name);
  },

  getTemplate: function () {
    return "MMM-gpsd.njk";
  },

  getTemplateData: function () {
    return this.config;
  },
});
