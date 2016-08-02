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

		cityModel.httpPost()(req, res);

	}).then( function(res) {
		assert.equal(201, res.statusCode);
		assert.isTrue(res._isJSON());

		var result = JSON.parse(res._getData());
		city_id = result.data._id;
		assert.equal(result.data.name, "Tbilisi");
		assert.equal(result.data.state, "Qartli");
		assert.equal(result.data.country, "Georgia");
		done();
	}).catch(done);
});

it("should create with count request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			body: {
				name : 'Kutaisi',
				state : 'Imereti',
				country : 'Georgia',
				count : 10
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.httpPost()(req, res);

	}).then( function(res) {
		assert.equal(201, res.statusCode);
		assert.isTrue(res._isJSON());

		var result = JSON.parse(res._getData());
		assert.equal(result.data.name, "Kutaisi");
		assert.equal(result.data.state, "Imereti");
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

		cityModel.httpPost()(req, res);

	}).then( function(res) {
		assert.equal(400, res.statusCode);
		assert.isTrue(res._isJSON());

		done();
	}).catch(done);
});



it("should httpGet request", function (done) {

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

		cityModel.httpGet()(req, res);

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

it("should httpGet request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.httpGet()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.isAbove(result.data.length, 0, 'Data length greater then 0');

	}).catch(done);
});

it("should httpGet skip request", function (done) {

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

		cityModel.httpGet()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 0, 'Data length equal 0');

	}).catch(done);
});

it("should httpGet skip request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {limit :1}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.httpGet()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 1, 'Data length equal 1');

	}).catch(done);
});

it("should httpGet filter, select, sortrequest", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {
				where : '{ "name" : "Tbilisi"}'
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.httpGet()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 1, 'Data length equal 1');

	}).catch(done);
});

it("should httpGet select, sort request", function (done) {

	return new Promise(function(resolve, reject) {
		var req = httpMock.createRequest({
			query : {
				select : "name count",
				sort : '-count'
			}
		});
		var res = httpMock.createResponse();
		res.on('end', function(){
			return resolve(res);
		}).on('error', function(err) {
			return reject(err);
		});

		cityModel.httpGet()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 2, 'Data length equal 0');
		assert.equal(result.data[0].count, 10, 'Data count equal 10');
		assert.notProperty(result.data[0], 'state');
		assert.notProperty(result.data[0], 'country');
		assert.property(result.data[0], 'name');
		assert.property(result.data[0], 'count');

	}).catch(done);
});

it("should httpGet pagination request", function (done) {

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

		cityModel.httpGet()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
		var result = JSON.parse(res._getData());
		assert.equal(result.data.length, 1, 'Data length equal 1');

	}).catch(done);
});

it("should httpPut request", function (done) {
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

		cityModel.httpPut()(req, res);

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

it("should httpDelete request", function (done) {
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

		cityModel.httpDelete()(req, res);

	}).then( function(res) {
		assert.equal(200, res.statusCode);
		assert.isTrue(res._isJSON());
		done();
	}).catch(done);
});
