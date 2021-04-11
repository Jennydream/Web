var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({
    class: String,
    cname : String,
    profe : String,
    Mstudent : Number,
    credit : Number,
    bagvalue : Number,
    sugangvalue : Number,
    regi_student : Number
});

module.exports = mongoose.model('class', ClassSchema);