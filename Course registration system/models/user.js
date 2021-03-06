var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    student_id: String,
    password : String,
    name : String,
    birth : String,
    department : String,
    allow_credit : Number
});

module.exports = mongoose.model('user', UserSchema);
