'use strict';

var debug = require('debug')('crud-mongoose-debug');

module.exports = function (schema, options) {

	var crud = require('./crud')(schema);

	schema.static.list = function(){
		return true;
	};
	schema.static.create = crud.create;
	schema.static.read = crud.read;
	schema.static.update = crud.update;
	schema.static.delete = crud.delete;
	schema.static.registerRouter = function (router) {
		var name = schema.paths;
		router.route('/' + name + '/list').get(crud.list); // get all items
		router.route('/' + name + '/').post(crud.create); // Create new Item

		router.route('/' + name +'/:id')
			.get(crud.read) // Get Item by Id
			.put(crud.update) // Update an Item with a given Id
			.delete(crud.delete); // Delete and Item by Id
	}
}
