var mongoose = require('mongoose');

var expect = require('chai').expect;

describe('tests for module types', function () {
	"use strict";

	it('should schema functions', function () {

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
		var crud =require('../index')({model:personModel});

		expect(crud.list).to.exist;
		expect(crud.list).to.be.a('Function');

		expect(crud.read).to.exist;
		expect(crud.read).to.be.a('Function');

		expect(crud.create).to.exist;
		expect(crud.create).to.be.a('Function');

		expect(crud.update).to.exist;
		expect(crud.update).to.be.a('Function');

		expect(crud.delete).to.exist;
		expect(crud.delete).to.be.a('Function');

		expect(crud.registerRouter).to.exist;
		expect(crud.registerRouter).to.be.a('Function');

		expect(crud.mongoosePlugin).to.exist;
		expect(crud.mongoosePlugin).to.be.a('Function');
	});

});
