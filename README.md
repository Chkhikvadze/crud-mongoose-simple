crud-mongoose-simple
====================

[![Build Status](https://travis-ci.org/Chkhikvadze/crud-mongoose-simple.svg?branch=master)](https://github.com/Chkhikvadze/crud-mongoose-simple)


Simple List, Create, Read, Update and Delete requests for a given Mongoose model. 
Create Express Route easily.

## Install

```bash
$ npm install crud-mongoose-simple
```

## Server Setup With Manual Route

```js

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
```

##Example Call From Client Side By jQuery:

## List
```js

Get List with query params. (working all mongoose query)

var query = { where : {},  skip: 10, limit: 20 };

query.where= {
    'occupation': { "$regex": "host", "$options": "i" },
    'name.last': 'Ghost',
    'age': { $gt: 17, $lt: 66 },
    'likes': { $in: ['vaporizing', 'talking'] }
};

query.select = 'name occupation';

query.sort = '-occupation';

$.get('http://localhost:3000/api/person/list', query, function(result, status){
    console.log(result);
});
```


##List Pagination
```js

var query = { where : {},  pageSize : 25, page : 1 };

query.select = 'name occupation';

query.sort = '-occupation';

$.get('http://localhost:3000/api/person/list', query, function(result, status){
    console.log(result);
});
```

##Create
```js

var data = {
    name : {first : "Giga",
            last : "Chkhikvadze" },
    age : 50
}

$.post('http://localhost:3000/api/person/', data, function(result){
    console.log(result);
});
```

##Read
```js

var id = '578d33f2d0920b0db20f8643';

$.get('http://localhost:3000/api/person/' + id, function(result, status){
     console.log(result);
});
```

##Edit
```js

var id = '578d33f2d0920b0db20f8643';

var data = {
    name : {first : "Giga",
            last : "Chkhikvadze" },
    age : 50
}

$.ajax({
    url: 'http://localhost:3000/api/person/' + id,
    type: 'PUT',
    success: function(result) {
        console.log(result);
    }
});
```

##Delete
```js

var id = '578d33f2d0920b0db20f8643';

$.ajax({
    url: 'http://localhost:3000/api/person/' + id,
    type: 'DELETE',
    success: function(result) {
        console.log(result);
    }
});
```

## Server Setup With Auto Route

```js

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
```

## Server Custom Route

```js
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
}, personModel.list())
```
