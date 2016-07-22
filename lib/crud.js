var utils = require('./utils.js');
var debug = require('debug')('crud-mongoose-simple');

var Model;

module.exports = function (model) {
	Model = model;
	return {
		list : list,
		create : create,
		read : read,
		update : update,
		delete : deleteItem
	}
}

/**
 * Get all items by filter
 * @param req
 * @param res
 */
function list(req, res) {
	var query = Model.find();


	if (req.query.page && !isNaN(req.query.page) ){
		var pageSize = parseInt(req.query.pageSize || 20);
		var page = parseInt(req.query.page || 0);
		query.skip(page * pageSize);
		query.limit(pageSize);
	}else {
		if (req.query.skip && !isNaN(req.query.skip)) {
			query.skip(req.query.skip);
		}

		if (req.query.limit && !isNaN(req.query.limit)) {
			query.limit(req.query.limit);
		}
	}

	if (req.query.where !== undefined) {
		var where = JSON.parse(req.query.where);

		query.where(where)
	}

	if (req.query.select !== undefined) {
		query.select(req.query.select);
	}

	if (req.query.sort !== undefined) {
		query.sort(req.query.sort);
	}


	query.exec(function (err, items) {
		if (err) {
			debug(err);
			return utils.serverError(res);
		}

		return utils.ok(res, items);
	});
}

/**
 * Create new Item
 * @param req
 * @param res
 */
function create(req, res) {
	var item = new Model(req.body);
	// assign files
	for (var key in req.files) {
		item[key] = req.files[key].name; // temp
	}
	item.save(function (err, item) {
		if (err) {
			debug(err);
			return utils.badRequest(res, err.errors);
		}

		return utils.ok(res, items);
	});
}

/**
 * Get Item by Id
 * @param req
 * @param res
 */
function read(req, res) {
	Model.findById(req.params.id, function (err, item) {
		if (err) {
			debug(err);
			return res.status(500).json(response.error());
		}

		if (!item) {
			return res.status(404).json(response.not_found());
		}

		return utils.ok(res, item);
	});
}

/**
 *  Update an Item with a given Id
 * @param req
 * @param res
 */
function update(req, res) {
	Model.findById(req.params.id, function (err, item) {
		if (err) {
			debug(err);
			return res.status(500).json(response.error());
		}

		if (!item) {
			return res.status(404).json(response.not_found());
		}

		item.set(req.body);

		// assign files
		for (var key in req.files) {
			item[key] = req.files[key].name; // temp
		}
		item.save(function (err, item) {
			if (err) {
				debug(err);
				return utils.badRequest(res, err.errors);
			}

			return utils.created(res, item);
		});
	});
}

/**
 * Delete and Item by Id
 * @param req
 * @param res
 */
function deleteItem(req, res) {
	Model.findById(req.params.id, function (err, item) {
		if (err) {
			debug(err);
			return res.status(500).json(response.error());
		}

		if (!item) {
			return res.status(404).json(response.not_found());
		}

		item.remove(function (err) {
			if (err) {
				debug(err);
				return utils.badRequest(res, err.errors);
			}

			return utils.ok(res);
		});
	});
}
