var mongoose = require('mongoose');
// mongoose.plugin(require('../index'));

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
		personSchema.plugin(require('../index'));

		expect(personModel.list).to.exist;
		// expect(personModel.read).to.exist;
		// expect(personModel.create).to.exist;
		// expect(personModel.update).to.exist;
		// expect(personModel.delete).to.exist;
	});

});
