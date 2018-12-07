var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var usrSchema = new Schema({
  dispName: {
    type: String,
    required: "Title required"
  }
});

var Usr = mongoose.model('Usr', usrSchema)
module.exports = Usr;
