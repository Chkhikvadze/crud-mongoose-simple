'use strict';

var debug = require('debug')('crud-mongoose-debug');

module.exports = exports = function (schema, options) {

	var crud = require('./crud')(schema);

	// schema.static.list = function(){
	// 	return true;
	// };
	schema.static('list', function() {
		return crud.list;
	});

	schema.static('create', function() {
		return crud.create;
	});

	schema.static('read', function() {
		return crud.read;
	});

	schema.static('update', function() {
		return crud.update;
	});

	schema.static('delete', function() {
		return crud.delete;
	});

	schema.static('registerRouter', function(router) {
		var name = schema.paths;
		router.route('/' + name + '/list').get(crud.list); // get all items
		router.route('/' + name + '/').post(crud.create); // Create new Item

		router.route('/' + name +'/:id')
			.get(crud.read) // Get Item by Id
			.put(crud.update) // Update an Item with a given Id
			.delete(crud.delete); // Delete and Item by Id
	});
}
