'use strict';

module.exports = function(options) {
	var crud = require('./lib/crud')(options.model);
	var modelName = options.model.modelName;
	return {
		list: crud.list,

		create: crud.create,

		read: crud.read,

		update: crud.update,

		delete: crud.delete,

		registerRouter : function (router, url) {
			router.route(url + modelName + '/list').get(crud.list); // get all items
			router.route(url + modelName + '/').post(crud.create); // Create new Item

			router.route(url + modelName +'/:id')
				.get(crud.read) // Get Item by Id
				.put(crud.update) // Update an Item with a given Id
				.delete(crud.delete); // Delete and Item by Id
		},
		mongoosePlugin : mongoosePlugin
	};
}


function mongoosePlugin(schema, options) {

	schema.statics.list = function(req, res) {
		return require('./lib/crud')(this).list(req, res);
	};

	schema.statics.create = function(req, res) {
		require('./lib/crud')(this).create(req, res);
	};

	schema.statics.read = function(req, res) {
		require('./lib/crud')(this).read(req, res);
	};

	schema.statics.update = function(req, res) {
		require('./lib/crud')(this).update(req, res);
	};

	schema.statics.delete = function(req, res) {
		require('./lib/crud')(this).delete(req, res);
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
