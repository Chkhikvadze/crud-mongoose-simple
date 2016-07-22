module.exports.ok = function (res, data) {
	var response = {
		code: 'OK',
		message: 'Operation is successfully executed',
		data: data || {}
	};
	return res.status(200).json(response);
};

module.exports.badRequest = function (res, data) {
	var response = {
		code: 'E_BAD_REQUEST',
		message: 'The request cannot be fulfilled due to bad syntax',
		data: data || {}
	};
	return res.status(400).json(response);
};

module.exports.created = function (res, data) {
	var response = {
		code: 'CREATED',
		message: 'The request has been fulfilled and resulted in a new resource being created',
		data: data || {}
	};
	return res.status(201).json(response);
};

module.exports.forbidden = function (res, data) {
	var response = {
		code: 'E_FORBIDDEN',
		message: 'User not authorized to perform the operation',
		data: data || {}
	};
	return res.status(403).json(response);
};

module.exports.notFound = function (res, data) {
	var response = {
		code: 'E_NOT_FOUND',
		message: 'he requested resource could not be found but may be available again in the future',
		data: data || {}
	};
	return res.status(404).json(response);
};

module.exports.serverError = function (res, data) {
	var response = {
		code: 'E_INTERNAL_SERVER_ERROR',
		message: 'Something bad happened on the server',
		data: data || {}
	};
	return res.status(500).json(response);
};




