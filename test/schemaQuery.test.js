var countryModel = require('./model').country;

var assert = require('chai').assert;

var httpMock = require('./http');

var country_id;

it("SchemaQuery create request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			body: {
				name : "Georgia",
				cityCount : "150",
				type : "Small"
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		countryModel.create()(req, res);

	}).then( function(res) {
		assert.equal(201, res.statusCode);
		assert.isTrue(res._isJSON());

		var result = JSON.parse(res._getData());
		country_id = result.data._id;
		assert.equal(result.data.name, "Georgia");
		assert.equal(result.data.cityCount, "150");
		assert.equal(result.data.type, "Small");
		done();
	}).catch(done);
});

it("SchemaQuery create reqest 2", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			body: {
				name : "England",
				cityCount : "700",
				type : "Big"
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		countryModel.create()(req, res);

	}).then( function(res) {
		assert.equal(201, res.statusCode);
		assert.isTrue(res._isJSON());

		var result = JSON.parse(res._getData());
		assert.equal(result.data.name, "England");
		assert.equal(result.data.cityCount, "700");
		assert.equal(result.data.type, "Big");
		done();
	}).catch(done);
});

it("SchemaQuery create reqest 3", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			body: {
				name : "Usa",
				cityCount : "300",
				type : "Very Big"
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		countryModel.create()(req, res);

	}).then( function(res) {
		assert.equal(201, res.statusCode);
		assert.isTrue(res._isJSON());

		var result = JSON.parse(res._getData());
		assert.equal(result.data.name, "Usa");
		assert.equal(result.data.cityCount, "300");
		assert.equal(result.data.type, "Very Big");
		done();
	}).catch(done);
});

it("SchemaQuery read request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			params: {
				id: country_id
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		countryModel.read()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());

		var result = JSON.parse(res._getData());
		assert.equal(result.data.name, "Georgia");
		assert.notProperty(result.data, 'cityCount');
		assert.notProperty(result.data, 'type');
		done();
	}).catch(done);
});

it("SchemaQuery list request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});


		countryModel.list()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 2, 'Data length greater then 2');

	}).catch(done);
});

it("apiQuery list apiQuery.select, apiQuery.where, client.skip request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {skip : 2}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		req.apiQuery = {
			where : {
				cityCount : 700
			},
			select : 'firstName lastName'
		}
		countryModel.list()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 1, 'Data length equal 1');
		assert.notProperty(result.data[0], 'cityCount');
		assert.notProperty(result.data[0], 'type');

	}).catch(done);
});

it("SchemaQuery list pageSize request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {pageSize :1}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		countryModel.list()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 1, 'Data length equal 1');

	}).catch(done);
});

it("SchemaQuery list filter, select, sort request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {
				pageSize : 1
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		countryModel.list()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 1, 'Data length equal 1');

	}).catch(done);
});

it("SchemaQuery list select, sort request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {
				select : "name count",
				sort : '-cityCount'
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		countryModel.list()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 2, 'Data length equal 0');
		assert.notProperty(result.data[0], 'cityCount');
		assert.notProperty(result.data[0], 'type');
		assert.property(result.data[0], 'name')

	}).catch(done);
});

it("SchemaQuery list pagination request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {
				pageSize : 1,
				page : 1
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		countryModel.list()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 1, 'Data length equal 1');

	}).catch(done);
});


it("SchemaQuery list requestQuery.select request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {
				select : '-name firstName lastName'
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		countryModel.list()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.notProperty(result.data[0], 'cityCount');
		assert.notProperty(result.data[0], 'type');
		assert.property(result.data[0], 'name')

	}).catch(done);
});

it("SchemaQuery list schemaQuery.select, apiQuery.select, requestQuery.select request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {
				select : '-name firstName lastName'
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		req.apiQuery = {
			select : 'name, fistName'
		}
		countryModel.list()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.notProperty(result.data[0], 'cityCount');
		assert.notProperty(result.data[0], 'type');
		assert.property(result.data[0], 'name')

	}).catch(done);
});
