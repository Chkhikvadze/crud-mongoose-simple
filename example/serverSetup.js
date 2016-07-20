
function manualRoute(){
	var express = require('express');
	var router = express.Router();
	var mongoose = require('mongoose');

	var personSchema = new mongoose.Schema({
		name: {
			first: String,
			last: String
		},
		age : Number,
		accupation : String,
		likes : []
	});

	var personModel = mongoose.model('Person', personSchema);

	var crud = require('crud-mongoose-simple')({model:personModel});
	router.route('/person/list').get(crud.list) // Get all items by filter
	router.route('/person/').post(crud.create); // Create new Item

	router.route('/person/:id')
		.get(crud.read) // Get Item by Id
		.put(crud.update) // Update an Item with a given Id
		.delete(crud.delete); // Delete and Item by Id
}

function autoRoute() {
	var express = require('express');
	var router = express.Router();

	var mongoose = require('mongoose');
	var personSchema = new mongoose.Schema({
		name: String
	});

	var personModel = mongoose.model('Person', personSchema);

	var crud = require('crud-mongoose-simple')({model:personModel})
	crud.registerRouter(router, '/api/v1/');

	/**
	 * It get routes:
	 * GET - http://localhost:3000/api/v1/{modelName}/list  - Get all items by filter
	 * POST - http://localhost:3000/api/v1/{modelName}/ - Create new Item
	 * PUT - http://localhost:3000/api/v1/{modelName}/:id - Update an Item with a given Id
	 * DELETE - http://localhost:3000/api/v1/{schemaName}/:id - Delete and Item by Id
	 */
}



function autoRouteByMongoosePlugin() {
	var mongoose = require('mongoose');
	var mongoosePlugin = require('crud-mongoose-simple')().mongoosePlugin;
	mongoose.plugin(mongoosePlugin);

	var personSchema = new mongoose.Schema({
		name: String
	});

	var personModel = mongoose.model('Person', personSchema);

	var express = require('express');
	var router = express.Router();
	personModel.registerRouter(router, '/api/v1/');

	/**
	 * It get routes:
	 * GET - http://localhost:3000/api/v1/{modelName}/list  - Get all items by filter
	 * POST - http://localhost:3000/api/v1/{modelName}/ - Create new Item
	 * PUT - http://localhost:3000/api/v1/{modelName}/:id - Update an Item with a given Id
	 * DELETE - http://localhost:3000/api/v1/{schemaName}/:id - Delete and Item by Id
	 */
}

