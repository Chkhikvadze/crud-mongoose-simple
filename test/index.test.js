var mongoose = require('mongoose');
var crud = require('../index');
mongoose.plugin(crud)

var expect = require('chai').expect;

var httpMock = require('./http');

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


	// it("should list request", function (done) {
    //
	// 	new Promise(function(resolve, reject) {
	// 		var req = httpMock.createRequest({
	// 		});
	// 	var res = httpMock.createResponse();
	// 	res.on('end', function(){
	// 		return resolve(res);
	// 	}).on('error', function(err) {
	// 			return reject(err);
	// 	});
	// 	var personSchema = new mongoose.Schema({
	// 		name: {
	// 			first: String,
	// 			last: String
	// 		},
	// 		age : Number,
	// 		accupation : String,
	// 		likes : []
	// 	});
    //
	// 	var personModel = mongoose.model('Person', personSchema);
	// 	personModel.list()(req, res);
    //
	// 	}).then( function(res) {
	// 		// assert.equal(notFoundResponse.status, res.statusCode);
	// 		// assert.isTrue(res._isJSON());
    //
	// 		done();
	// 	}).catch(done);
	// });


});
