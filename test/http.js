var httpMocks = require('node-mocks-http');
// var apiResponses = require('../../app/api/responses/index');
// var appConfig = require('../../app/config/index');

module.exports = {
	createRequest: function (config) {
		var req = httpMocks.createRequest(config);
		req.app = req.app || {};
		req.app.settings = req.app.settings || {};
		// req.app.settings.configuration = appConfig;
		return req;
	},
	createResponse: function () {
		var res = httpMocks.createResponse({
			eventEmitter: require('events').EventEmitter
		});
		// apiResponses.forEach(function (response) {
		// 	response({}, res, function () { });
		// });
		return res;
	}
};
