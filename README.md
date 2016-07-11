crud-mongoose-simple
============

Simple List, Create, Read, Update and Delete requests for a given Mongoose model

## Install

```bash
$ npm install crud-mongoose-simple
```

## Usage

```js
/**
 * @param {Object} options
 * @param {Object} options.model
 *		  - A Mongoose model of the resource you want
 */

crudGenerator(options);
```

## Example

```js
var express = require('express');
var router = express.Router();

var personModel = require('./model/person');
var crudController = require('crud-mongoose-simple')({model:personModel});

router.route('/person/')
    .get(crudController.list) // get all items
    .post(crudController.create); // Create new Item

router.route('/person/:id')
    .get(crudController.read) // Get Item by Id
    .put(crudController.update) // Update an Item with a given Id
    .delete(crudController.delete); // Delete and Item by Id
```

##Example call from client
```js

Get List with query params

var query = { where : {}, select : {},  skip: 10, limit: 20 };

query.where= {
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
};

query.select('name occupation');

query.sort('-occupation');

$.get('http://localhost:3000/api/person/list', query, function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
});
```
