require('../config/db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserDetailSchema = new Schema({
	name: { 
		type : String,
		required: [true, 'Please provide Bank Name']
	},
	email: {
        type : String,
        required : true,
        unique : true,
        index : true
    },
	phone: String,
	address: String,
    password : String,
	status: { 
		type : String,
		default: 'Active'
	},
	added_on : { 
		type: Date, 
		default: Date.now 
	}
})

module.exports = mongoose.model('Userdetails', UserDetailSchema);