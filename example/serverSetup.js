
function manualRoute(){
	var express = require('express');
	var router = express.Router();


	var mongoose = require('mongoose');
	var crud = require('crud-mongoose-simple');
	mongoose.plugin(crud);

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

	router.route('/person/list').get(personModel.list()) // Get all items by filter
	router.route('/person/').post(personModel.create()); // Create new Item

	router.route('/person/:id')
		.get(personModel.read()) // Get Item by Id
		.put(personModel.update()) // Update an Item with a given Id
		.delete(personModel.delete()); // Delete and Item by Id
}

function autoRoute() {
	var express = require('express');
	var router = express.Router();

	var mongoose = require('mongoose');
	var crud = require('crud-mongoose-simple');
	mongoose.plugin(crud);

	var personSchema = new mongoose.Schema({
		name: String
	});

	var personModel = mongoose.model('Person', personSchema);

	personModel.registerRouter(router, '/api/v1/');

	/**
	 * It get routes:
	 * GET - http://localhost:3000/api/v1/{modelName}/list  - Get all items by filter
	 * POST - http://localhost:3000/api/v1/{modelName}/ - Create new Item
	 * PUT - http://localhost:3000/api/v1/{modelName}/:id - Update an Item with a given Id
	 * DELETE - http://localhost:3000/api/v1/{schemaName}/:id - Delete and Item by Id
	 */
}

function customRoute(){
	var express = require('express');
	var router = express.Router();


	var mongoose = require('mongoose');
	var crud = require('crud-mongoose-simple');
	mongoose.plugin(crud);

	var personSchema = new Schema({
		name: String
	});

	var personModel = mongoose.model('Person', personSchema);

	router.route('/person/listbyuser').get(function(req, res, next){
		var userId = '578d33f2d0920b0db20f8643';
		req.query.pageSize = 25;
		req.query.where.userId = userId;
		req.query.sort = '-name';

		next();
	}, personModel.list(req, res))
}
