/* Magic Mirror
 * Module: MMM-gpsd
 *
 * MIT Licensed.
 */
Module.register("MMM-gpsd", {
	// Default module config.
	defaults: {
		text: "Hello World!"
	},

	getTemplate: function () {
		return "MMM-gpsd.njk";
	},

	getTemplateData: function () {
		return this.config;
	}
});
