var mongoose = require('mongoose');
var crud = require('../index');
mongoose.plugin(crud)

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

		expect(personModel.list).to.exist;
		expect(personModel.list).to.be.a('Function');

		expect(personModel.read).to.exist;
		expect(personModel.read).to.be.a('Function');

		expect(personModel.create).to.exist;
		expect(personModel.create).to.be.a('Function');

		expect(personModel.update).to.exist;
		expect(personModel.update).to.be.a('Function');

		expect(personModel.delete).to.exist;
		expect(personModel.delete).to.be.a('Function');



		expect(personModel.list()).to.exist;
		expect(personModel.list()).to.be.a('Function');

		expect(personModel.read()).to.exist;
		expect(personModel.read()).to.be.a('Function');

		expect(personModel.create()).to.exist;
		expect(personModel.create()).to.be.a('Function');

		expect(personModel.update()).to.exist;
		expect(personModel.update()).to.be.a('Function');

		expect(personModel.delete()).to.exist;
		expect(personModel.delete()).to.be.a('Function');
	});
});
