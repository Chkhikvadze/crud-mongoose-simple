var mongoose = require('mongoose');
var crud = require('../index');
mongoose.plugin(crud)

var personSchema = new mongoose.Schema({
	name: {
		first: String,
		last: String
	},
	age : Number,
	accupation : String,
	likes : []
});


var citySchema = new mongoose.Schema({
	name : String,
	state : String,
	country : String,
	count : Number
});

var personModel = mongoose.model('Person', personSchema);
var cityModel = mongoose.model('City', citySchema);

module.exports = {
	person : personModel,
	city : cityModel
}
