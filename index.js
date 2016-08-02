'use strict';

module.exports = function mongoosePlugin(schema, options) {

	schema.statics.httpGet = function() {
		return require('./lib/crud')(this).httpGet;
	};

	schema.statics.httpPost = function() {
		return require('./lib/crud')(this).httpPost;
	};

	schema.statics.httpPut = function() {
		return require('./lib/crud')(this).httpPut;
	};

	schema.statics.httpDelete = function() {
		return require('./lib/crud')(this).httpDelete;
	};

	schema.statics.countItems = function() {
		return require('./lib/crud')(this).count;
	};

	schema.statics.totalPages = function() {
		return require('./lib/crud')(this).totalPage;
	};

	schema.statics.registerRouter = function(router, url) {
		var crud = require('./lib/crud')(this);
		var modelName = this.modelName;
		router.route(url + modelName + '/list').get(crud.httpGet); // get all items
		router.route(url + modelName + '/').post(crud.httpPost); // Create new Item

		router.route(url + modelName +'/:id')
			.get(crud.httpGet) // Get Item by Id
			.put(crud.httpPut) // Update an Item with a given Id
			.delete(crud.httpDelete); // Delete and Item by Id
	};
}
