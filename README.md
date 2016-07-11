crud-mongoose-request
============

Simple List, Create, Read, Update and Delete requests for a given Mongoose model

## Install

```bash
$ npm install crud-mongoose-request
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

var userModel = require('./model/user');
var crudController = require('crud-mongoose-simple')({model:userModel});

router.route('/user/')
    .get(crudController.list) // get all items
    .post(crudController.create); // Create new Item

router.route('/user/:id')
    .get(crudController.read) // Get Item by Id
    .put(crudController.update) // Update an Item with a given Id
    .delete(crudController.delete); // Delete and Item by Id
```
