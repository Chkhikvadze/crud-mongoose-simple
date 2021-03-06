var utils = require('./utils.js');
var debug = require('debug')('crud-mongoose-simple');
var _ = require('lodash');


module.exports = function (model) {

	var schemaQuery = {};
	if (model.schema.options.query){
		schemaQuery = model.schema.options.query;
	}

	/**
	 * Get all items by filter or one item by id
	 * @param req
	 * @param res
	 */
	function httpGet(req, res){
		if (req.params.id != undefined){
			return findById(req, res);
		}else{
			return list(req, res);
		}
	}

	/**
	 * Get Count by filter
	 * @param req
	 * @param res
	 */
	function count(req, res) {
		var apiQuery = {};
		if (req.apiQuery != undefined){
			apiQuery = req.apiQuery;
		}
		var requestQuery = req.query;

		var query = model.find();

		//get where json
		query.where(getWhere(requestQuery, apiQuery));

		query.count(function (err, count) {
			if (err) {
				debug(err);
				return utils.serverError(res);
			}

			return utils.ok(res, count);
		});
	}

	/**
	 * Get Total Page by filter
	 * @param req
	 * @param res
	 */
	function totalPage(req, res) {
		var apiQuery = {};
		if (req.apiQuery != undefined){
			apiQuery = req.apiQuery;
		}
		var requestQuery = req.query;

		var query = model.find();

		var pageSize = getPageSize(requestQuery, apiQuery);

		//get where json
		query.where(getWhere(requestQuery, apiQuery));

		query.count(function (err, count) {
			if (err) {
				debug(err);
				return utils.serverError(res);
			}
			var totalPage = 1;
			if (pageSize){
				totalPage = Math.ceil(count / pageSize)
			}

			return utils.ok(res, totalPage);
		});
	}

	/**
	 * Create new Item
	 * @param req
	 * @param res
	 */
	function httpPost(req, res) {
		var item = new model(req.body);
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
	}

	/**
	 *  Update an Item with a given Id
	 * @param req
	 * @param res
	 */
	function httpPut(req, res) {
		model.findById(req.params.id, function (err, item) {
			if (err) {
				debug(err);
				return utils.badRequest(res, err.errors);
			}

			if (!item) {
				return utils.notFound(res);
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

				return utils.ok(res, item);
			});
		});
	}


	/**
	 * Get all items by filter
	 * @param req
	 * @param res
	 */
	function list(req, res) {
		var apiQuery = {};
		if (req.apiQuery != undefined){
			apiQuery = req.apiQuery;
		}
		var requestQuery = req.query;

		var query = model.find();

		var pageSize = getPageSize(requestQuery, apiQuery);
		if (pageSize){
			var page = parseInt(requestQuery.page || 1);
			var skip = (page-1) * pageSize;
			if (skip > 0) {
				query.skip((page - 1) * pageSize);
			}
			query.limit(pageSize);
		}else{

			var skip = getSkip(requestQuery, apiQuery);
			if (skip){
				query.skip(skip);
			}

			var limit = getLimit(requestQuery, apiQuery);
			if (limit){
				query.limit(limit);
			}
		}

		//get where json
		query.where(getWhere(requestQuery, apiQuery));

		var select = getSelect(requestQuery, apiQuery);
		if (select) {
			query.select(select);
		}

		if (apiQuery.sort) {
			query.sort(apiQuery.sort);
		}else if (requestQuery.sort !== undefined){
			query.sort(requestQuery.sort);
		}

		if (apiQuery.populate){
			for (var i=0; i < apiQuery.populate.length; i++){
				query.populate(apiQuery.populate[i]);
			}
		}

		if (schemaQuery.populate){
			for (var i=0; i < apiQuery.populate.length; i++){
				query.populate(apiQuery.populate[i]);
			}
		}

		if (requestQuery.populate){
			for (var i=0; i < apiQuery.populate.length; i++){
				query.populate(apiQuery.populate[i]);
			}
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
	 * Delete and Item by Id
	 * @param req
	 * @param res
	 */
	function httpDelete(req, res) {
		model.findById(req.params.id, function (err, item) {
			if (err) {
				debug(err);
				return utils.badRequest(res, err.errors);
			}

			if (!item) {
				return utils.notFound(res);
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

	/**
	 * get limit by priority (schemaQuery.limit, apiQuery.limit, request.limit)
	 * @param requestQuery
	 * @param apiQuery
	 * @returns {int}
	 */
	function getLimit(requestQuery, apiQuery) {
		var limit = null;
		if (schemaQuery.limit){
			limit = schemaQuery.limit;
		}

		if (apiQuery.limit && !isNaN(apiQuery.limit)){
			if (!limit || apiQuery.limit < limit){
				limit = apiQuery.limit;
			}
		}

		if (requestQuery.limit && !isNaN(requestQuery.limit)){
			if (!limit || requestQuery.limit < limit){
				limit = requestQuery.limit;
			}
		}
		return limit;
	}

	/**
	 * get skip by priority (schemaQuery.skip, apiQuery.skip, request.skip)
	 * @param requestQuery
	 * @param apiQuery
	 * @returns {int}
	 */
	function getSkip(requestQuery, apiQuery) {
		var skip = null;
		if (schemaQuery.skip){
			skip = schemaQuery.skip;
		}

		if (apiQuery.skip && !isNaN(apiQuery.skip)){
			if (!skip || apiQuery.skip < skip){
				skip = apiQuery.skip;
			}
		}

		if (requestQuery.skip && !isNaN(requestQuery.skip)){
			if (!skip || requestQuery.skip < skip){
				skip = requestQuery.skip;
			}
		}
		return skip;
	}

	/**
	 * get skip by priority (schemaQuery.pageSize, ApiQuery.pageSize, request.pageSize)
	 * @param requestQuery
	 * @param apiQuery
	 * @returns {int}
	 */
	function getPageSize(requestQuery, apiQuery) {
		var pageSize = null;
		if (schemaQuery.pageSize){
			pageSize = schemaQuery.pageSize;
		}
		if (apiQuery.pageSize && !isNaN(apiQuery.pageSize)){
			if (!pageSize || apiQuery.pageSize < pageSize){
				pageSize = apiQuery.pageSize;
			}
		}
		if (requestQuery.pageSize && !isNaN(requestQuery.pageSize)){
			if (!pageSize || requestQuery.pageSize < pageSize){
				pageSize = requestQuery.pageSize;
			}
		}
		return pageSize;
	}

	/**
	 * get skip by priority (schemaQuery.where, apiQuery.where, request.where)
	 * @param requestQuery
	 * @param apiQuery
	 * @returns {int}
	 */
	function getWhere(requestQuery, apiQuery){
		var where = {};

		if (requestQuery.where !== undefined) {
			where = JSON.parse(requestQuery.where);
		}

		if (apiQuery.where) {
			where = _.assign(where, apiQuery.where);
		}

		if (schemaQuery.where){
			where = _.assign(where, schemaQuery.where)
		}

		return where;
	}

	/**
	 * get skip by priority (schemaQuery.select, apiQuery.select, request.select)
	 * @param requestQuery
	 * @param apiQuery
	 * @returns {int}
	 */
	function getSelect(requestQuery, apiQuery) {
		var select = null;
		if (apiQuery.select){
			select = apiQuery.select;
		}

		if (requestQuery.select !== undefined){
			if (select != null){
				var result = _.intersectionWith(select.split(' '), requestQuery.select.split(' '), _.isEqual);
				select  = result.join(' ');
			}else{
				select = requestQuery.select;
			}
		}

		if (select == '' && apiQuery.select){
			select = apiQuery.select;
		}

		if (schemaQuery.select){
			if (select != null){
				var result = _.intersectionWith(select.split(' '), schemaQuery.select.split(' '), _.isEqual);
				select  = result.join(' ');
			}else{
				select = schemaQuery.select;
			}
		}

		if (select == '' && schemaQuery.select){
			select = schemaQuery.select;
		}

		return select;
	}


	/**
	 * Get Item by Id
	 * @param req
	 * @param res
	 */
	function findById(req, res) {
		var apiQuery = {};
		if (req.apiQuery != undefined){
			apiQuery = req.apiQuery;
		}
		var requestQuery = req.query;
		var select = getSelect(requestQuery, apiQuery);
		model.findById(req.params.id, select,function (err, item) {
			if (err) {
				debug(err);
				return utils.badRequest(res, err.errors);
			}

			if (!item) {
				return utils.notFound(res);
			}

			return utils.ok(res, item);
		});
	}


	return {
		httpGet: httpGet,
		httpPost: httpPost,
		httpPut: httpPut,
		httpDelete: httpDelete,
		count : count,
		totalPage: totalPage
	}
}
