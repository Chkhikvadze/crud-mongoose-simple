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

var countrySchema = new mongoose.Schema({
	name : String,
	cityCount : Number,
	type : String
}, {
	query : {
		// where : { price : 90 },
		select : 'name',
		pageSize : 2
	}
});

var personModel = mongoose.model('Person', personSchema);
var cityModel = mongoose.model('City', citySchema);
var countryModel = mongoose.model('Country', countrySchema);

module.exports = {
	person : personModel,
	city : cityModel,
	country : countryModel
}
