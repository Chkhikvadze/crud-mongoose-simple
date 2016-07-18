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

## Server setup

```js

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var personSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  age : Number,
  accupation : String,
  likes : []
});

var personModel = mongoose.model('Person', personSchema);
var crudController = require('crud-mongoose-simple')({model:personModel});

router.route('/person/list').get(crudController.list) // get all items
router.route('/person/').post(crudController.create); // Create new Item

router.route('/person/:id')
    .get(crudController.read) // Get Item by Id
    .put(crudController.update) // Update an Item with a given Id
    .delete(crudController.delete); // Delete and Item by Id
```

##Example Call From Client by jQuery:

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

$.get('http://localhost:3000/api/person/list', query, function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
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

##Creat
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
