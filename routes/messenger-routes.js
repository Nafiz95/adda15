module.exports = function(app) {

   var chat = require('./../controllers/messenger-controllers.js');  
   
   //GETS
   app.get('/chatroom/:s_name/:u_name', chat.newDash);        //CONTROLLER NEW FUNCTION => GOES TO CREATE SEARCH  
   app.get('/chatroom/:u_id', chat.newRoom);        //CONTROLLER NEW FUNCTION => GOES TO CREATE SEARCH
   app.get('/chatroom/search/results', chat.res);
   //POSTS
   app.post('/chatroom/createUser', chat.createUser);   //CONTROLLER CREATE USER FUNCTION
   app.post('/chatroom/createSession', chat.createSession);   //CONTROLLER CREATE SESSION FUNCTION
   app.post('/chatroom/saveSession', chat.saveSession);   //CONTROLLER CREATE SESSION FUNCTION
   app.post('/chatroom/saveMessage', chat.saveMessage);   //CONTROLLER CREATE SESSION FUNCTION
   app.post('/chatroom/search', chat.search);
   
   

}
