crud-mongoose-simple
============

Simple Create, Read, Update and Delete requests for a given Mongoose model

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

## Call From Client

```Get List
var query = { where : {}, select : {},  skip: 10, limit: 20 };

query.where= {
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
};

query.select('name occupation');

query.sort('-occupation');

//http get
$.get('http://localhost:3000/api/person/list', query, function(data, status){
    console.log(data);
});
```
