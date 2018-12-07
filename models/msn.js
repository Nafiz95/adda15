
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var msnSchema = new Schema({ //ID
  // SESSION NAME (WITH UNIQUE ID)
  msnName: {
    type: String
  },
  sTime:{ type: Date, default: Date.now },
  //KEEP TRACK OF ORGINIAL CREATOR OF ROOM
  creatorID: {
         type: mongoose.Schema.ObjectId,    //GETS ID FROM USER SCHEMA
         ref: 'user'
   },
  chattersID: [
     {
         type: mongoose.Schema.ObjectId,     //GETS ID FROM USER SCHEMA  BUT HOW
         ref: 'user'
     }
   ],
   message: [
     {
        sender: { type: mongoose.Schema.ObjectId, ref: 'user' },   //GETS ID FROM USER SCHEMA
        senderMsg: String,
        chatTime:{ type: Date, default: Date.now }
      }
    ]
});

var Msn = mongoose.model('Msn', msnSchema)
module.exports = Msn;