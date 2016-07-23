var cityModel = require('./model').city;

var assert = require('chai').assert;

var httpMock = require('./http');

var city_id;

it("should create request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			body: {
				name : 'Tbilisi',
				state : 'Qartli',
				country : 'Georgia'
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.create()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());

		var result = JSON.parse(res._getData());
		city_id = result.data._id;
		assert.equal(result.data.name, "Tbilisi");
		assert.equal(result.data.state, "Qartli");
		assert.equal(result.data.country, "Georgia");
		done();
	}).catch(done);
});


it("should create bed request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			body: {
				name : 'Tbilisi',
				count : "fault"
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.create()(req, res);

	}).then( function(res) {
		assert.equal(400, res.statusCode);
		assert.isTrue(res._isJSON());

		done();
	}).catch(done);
});



it("should read request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			params: {
				id: city_id
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.read()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());

		var result = JSON.parse(res._getData());
		assert.equal(result.data.name, "Tbilisi");
		assert.equal(result.data.state, "Qartli");
		assert.equal(result.data.country, "Georgia");
		done();
	}).catch(done);
});

it("should list request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.list()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.isAbove(result.data.length, 0, 'Data length greater then 0');

	}).catch(done);
});

it("should list skip limit request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {limit :0, skip : 1}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.list()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 0, 'Data length equal 0');

	}).catch(done);
});

it("should update request", function (done) {
	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			params: {
				id: city_id
			},
			body : {
				name : 'Tbilisi 1',
				state : 'Qartli 1',
				country : 'Georgia 1'
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.update()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());

		var result = JSON.parse(res._getData());
		assert.equal(result.data.name, "Tbilisi 1");
		assert.equal(result.data.state, "Qartli 1");
		assert.equal(result.data.country, "Georgia 1");
		done();
	}).catch(done);
});

it("should delete request", function (done) {
	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			params: {
				id: city_id
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.delete()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
	}).catch(done);
});
