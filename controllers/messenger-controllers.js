// INCLUDE MONGODB SCHEMA
var Msn = require('./../models/msn.js');
var Usr = require('./../models/user.js');
var x={};
var counter=0;
var y={};  // ETAR KAJ TA BHITORE KORA LAGBE
//--------CHECK IF COLLECTION IS EMPTY-------------------------------------
  var mongoose = require("mongoose");
  mongoose.connect("mongodb://"+process.env.IP+":27017/msn", function(err, client) {
      
      if(err) {
          console.log(err)
      }
      client.db.listCollections().toArray(function(err, collections) {
          console.log(collections);
          client.collection('usrs').countDocuments().then(function(result){
            //console.log(result);
            counter=result;
            //console.log("c:");
            //console.log(counter);
            //giveaway(result);
            
            //----------------------------------------------------------------
            if(counter>0)
              {
                Usr.findOne(function(err, data){
                    console.log(data._id);  // CHECK ID
                    x=data._id;               // KEEP ID
                    console.log(x);
                    y=data.dispName;
                    console.log("-----");
                });
              }
              else{console.log("NEW COMER. NO ID YET");}
           }, function(err){
             return console.log(err);
           });
      });
  });

// //GET FUCTION
// function giveaway(r)
// {
//   console.log(typeof(r));
//   counter=r;
//   console.log(r);
// }
//-----------------------------------------------------------------------------------------
// if(counter>0)
// {
//   Usr.findOne(function(err, data){
//       console.log(data._id);  // CHECK ID
//       x=data._id;               // KEEP ID
//       console.log(x);
//       y=data.dispName;
//       console.log("-----");
//   });
// }
// else{console.log("NEW COMER. NO ID YET");}
// console.log(y);
//-----------------------------------------------------------------------------------------
// GET REQUEST GETS CHATROOM EJS
module.exports.newRoom = function(request, response) {
  response.render('chatroom.ejs',{
      user:request.params.u_id
  });
}
//-----------------------------------------------------------------------------------------
// GET REQUEST GETS DASHBOARD EJS
module.exports.newDash = function(request, response) {
 
  response.render('dashboard.ejs');
}
//-----------------------------------------------------------------------------------------

// CREATE FUNCTIONS
module.exports.createUser = function(request, response) {       // REQUEST = DATA FROM FRONT END (INDEX EJS)
  console.log(request.body);                               //CHECK WHAT'S INSIDE THE PARAMETER THAT WE GOT FROM FRONT END (data: user)
  if(request.body.u_id == ""){                            // IF USER ID= NONE , NEW USER 
    var new_usr = new Usr({                              //  CREATE A SPECIFIC SCHEMA (SET ON THE BLUE PRINT) 
      dispName: request.body.title                      //  GET USER NAME FROM DATA AND SET IT ON THE SCHEMA
    });
    new_usr.save(function(err, data) {                 //  MONGODB FUNCTION TO SAVE CONTENTS OF DATA 
      if (err) return response.status(400).json({      //  IF ERROR IN DATA
        error: "PLEASE ENTER USER NAME"
      });
      console.log(data);                               
      return response.status(200).json({               // RETURNS RESPONSE TO INDEX.EJS
        u_id: data._id,                               //  RETURNS THE MONGODB ID IN VARIABLE CALLED u_id
        u_title: data.dispName
      });
     
    })
  }
  else
  {
    //FIND ID AND UPDATE JUST THE NAME. ASSUME ONE PC = ONE USER
      mongoose.connect("mongodb://"+process.env.IP+":27017/msn", function(err, client) {
      if(err) {
          console.log(err)
      }
      client.db.listCollections().toArray(function(err, collections) {
          client.collection('usrs').countDocuments().then(function(result){
            counter=result;
            //----------------------------------------------------------------
                if(counter>0)
                {
                 Usr.findOneAndUpdate({_id: x}, {$set:{dispName:request.body.title}}, {new: true}, (err, data) => {
                  if (err) {
                      console.log("Something wrong when updating data!");
                  }
                  console.log(data);
                  return response.status(200).json({               // RETURNS RESPONSE TO INDEX.EJS
                    u_id: data._id,                               //  RETURNS THE MONGODB ID IN VARIABLE CALLED u_id
                    u_title: data.dispName
                  });
                });
                }
           }, function(err){
             return console.log(err);
           });
      });
  });
  }

}
//-----------------------------------------------------------------------------------------
module.exports.createSession = function(request, response) {       // REQUEST = DATA FROM FRONT END (INDEX EJS)
  console.log(request.body);
  console.log("error2")//CHECK WHAT'S INSIDE THE PARAMETER THAT WE GOT FROM FRONT END (data: user)
  if(request.body.s_id == ""){                            // IF USER ID= NONE , NEW USER 
    var new_msn = new Msn({                              //  CREATE A SPECIFIC SCHEMA (SET ON THE BLUE PRINT) 
       msnName: request.body.s_name,                      //  GET USER NAME FROM DATA AND SET IT ON THE SCHEMA
       creatorID:request.body.u_id,
       chattersID:request.body.u_id
    });
    new_msn.save(function(err, data) {                 //  MONGODB FUNCTION TO SAVE CONTENTS OF DATA 
      if (err) return response.status(400).json({      //  IF ERROR IN DATA
        error: "PLEASE ENTER SESSION NAME"
      });
      console.log(data);                               
      return response.status(200).json({               // RETURNS RESPONSE TO INDEX.EJS
        s_id: data._id,                               //  RETURNS THE MONGODB ID IN VARIABLE CALLED u_id
        s_title: data.msnName
      });
    })
  }
}

//-----------------------------------------------------------------------------------------
module.exports.saveMessage = function(request, response) {       // REQUEST = DATA FROM FRONT END (INDEX EJS)
  console.log(request.body); // var sessionMsg={s_msg:"msg"};
  console.log("error2")//CHECK WHAT'S INSIDE THE PARAMETER THAT WE GOT FROM FRONT END (data: user)
  
  if(request.body.s_msg != ""){                            // IF USER ID= NONE , NEW USER 
    var myMsn = new Msn();
    var messageObj={
        sender: request.body.userID,   //GETS ID FROM USER SCHEMA
        senderMsg: request.body.s_msg,
        // chatTime: request.body.t
    }
    console.log(messageObj);
    // myMsn.message.push(messageObj);
    // Msn.save(done);
    Msn.findOneAndUpdate({_id:request.body.ss_id }, {$push:{message:messageObj}}, {new: true}, (err, data) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
      console.log(data);
      return response.status(200).json({               // RETURNS RESPONSE TO INDEX.EJS
      });
    });
    // myMsn.message.push(messageObj);
    // myMsn.save(function(err, data) {                 //  MONGODB FUNCTION TO SAVE CONTENTS OF DATA 
    //   if (err) return response.status(400).json({      //  IF ERROR IN DATA
    //     error: "PLEASE ENTER MESSAGE"
    //   });
    //   console.log(data);                               
    //   return response.status(200).json({               // RETURNS RESPONSE TO INDEX.EJS

    //   });
    // })
  }
}
//-----------------------------------------------------------------------------------------

module.exports.saveSession = function(request, response) {       // REQUEST = DATA FROM FRONT END (INDEX EJS)
  console.log(request.body);
  console.log("error2")//CHECK WHAT'S INSIDE THE PARAMETER THAT WE GOT FROM FRONT END (data: user)
  if(request.body.s_id == ""){                            // IF USER ID= NONE , NEW USER 
    var new_msn = new Msn({                              //  CREATE A SPECIFIC SCHEMA (SET ON THE BLUE PRINT) 
       msnName: request.body.s_name,                      //  GET USER NAME FROM DATA AND SET IT ON THE SCHEMA
       creatorID:request.body.u_id,
       chattersID:request.body.u_id
    });
    new_msn.save(function(err, data) {                 //  MONGODB FUNCTION TO SAVE CONTENTS OF DATA 
      if (err) return response.status(400).json({      //  IF ERROR IN DATA
        error: "PLEASE ENTER SESSION NAME"
      });
      console.log(data);                               
      return response.status(200).json({               // RETURNS RESPONSE TO INDEX.EJS
        s_id: data._id,                               //  RETURNS THE MONGODB ID IN VARIABLE CALLED u_id
        s_title: data.msnName
      });
    })
  }
}

// module.exports.list = function(request, response) {
// Article.find(function(err, data){
//   if(err){
//     response.status(400)
//       .json({
//         error: "Database query error"
//       });
//   }

//   response.status(200).json({
//     articles: data
//   });
// });

// }
// module.exports.single = function(request, response) {

//   Article.findOne({_id:request.params.articleID},
//     function(err, data){
//       if(err){
//         response.status(400)
//           .json({
//             error: "Database query error"
//           });
//       }else{
//       response.render('article.ejs', {
//         article: data
//       })
//     }
//   });

// }
// var a = User.find()

// a[1].dispName
//-----------------------------------------------------------------------------------------

module.exports.search = function(request, response) {
   Msn.find({msnName: request.body.chatroomName}, function(err, data){
      if(err)
         return response.status(400).json({error: err});
      console.log(data)
      response.status(200).json({
         results: data
      });
   });
}

//-----------------------------------------------------------------------------------------
module.exports.res = function(request, response) {
   response.render('chatrooms.ejs', {
      title: "Results"
   });
}