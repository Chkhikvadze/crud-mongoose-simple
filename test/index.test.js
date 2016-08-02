var personModel = require('./model').person;
var expect = require('chai').expect;

describe('tests for module types', function () {
	"use strict";

	it('should schema functions', function () {



		expect(personModel.httpGet).to.exist;
		expect(personModel.httpGet).to.be.a('Function');

		expect(personModel.httpPost).to.exist;
		expect(personModel.httpPost).to.be.a('Function');

		expect(personModel.httpPut).to.exist;
		expect(personModel.httpPut).to.be.a('Function');

		expect(personModel.httpDelete).to.exist;
		expect(personModel.httpDelete).to.be.a('Function');

	});
});
