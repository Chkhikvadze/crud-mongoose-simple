'use strict';

module.exports = function mongoosePlugin(schema, options) {

	schema.statics.list = function() {
		return require('./lib/crud')(this).list;
	};

	schema.statics.create = function() {
		return require('./lib/crud')(this).create;
	};

	schema.statics.read = function() {
		return require('./lib/crud')(this).read;
	};

	schema.statics.update = function() {
		return require('./lib/crud')(this).update;
	};

	schema.statics.delete = function() {
		return require('./lib/crud')(this).delete;
	};

	schema.statics.registerRouter = function(router, url) {
		var crud = require('./lib/crud')(this);
		var modelName = this.modelName;
		router.route(url + modelName + '/list').get(crud.list); // get all items
		router.route(url + modelName + '/').post(crud.create); // Create new Item

		router.route(url + modelName +'/:id')
			.get(crud.read) // Get Item by Id
			.put(crud.update) // Update an Item with a given Id
			.delete(crud.delete); // Delete and Item by Id
	};
}
