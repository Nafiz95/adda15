<h1 align="center"> adda15<h1>
<h2 align="center"> FUNCTIONALITIES </h2>
<hr>
<p align="center"><img src="https://user-images.githubusercontent.com/24278948/49653204-6e590e00-fa5e-11e8-9d15-136704813d63.JPG"></p>
<hr>
<h3 align="center"> CREATING USER (NEW OR OLD) </h3>
<ul>
  <li> localStorages are empty at first </li>
 <li> "START CHATTING" takes the input and saves in localStorage "userData"</li>
 <li> Saves User name in mongoDB (Collection name "usrs"), which assigns "_id" caught in "u_id" </li>
 <li> The u_id is sent to next page when rendered </li>
</ul>
<p align="center"><img src="https://user-images.githubusercontent.com/24278948/49654611-8894eb00-fa62-11e8-9eea-d38807873bd1.JPG"></p>
<hr>
<h3 align="center">  DASHBOARD</h3>
<ul>
  <li> localStorages "historyData" and "sessionData" are empty. This has the list of sessions a user creates </li>
 <li> "SEARCH ROOM" searches the chat session another user creates</li>
 <li> "CREATE ROOM" creates new chat session and saves session name in localStorage "sessionData" </li>
</ul>
<p align="center"><img src="https://user-images.githubusercontent.com/24278948/49655480-f8a47080-fa64-11e8-85fa-062a67ccbe50.JPG"></p>
<h4> CREATE ROOM </h4>
<ul>
 <li> Dynamically generates a form to create session </li>
 <li> Saves user given name for session in localSotrage "sessionData" and also in mongoDB (collection: msns)</li>
</ul>
<p align="center"><img src="https://user-images.githubusercontent.com/24278948/49657607-3f489980-fa6a-11e8-877e-a312f419f791.JPG"></p>
<p align="center"><img src="https://user-images.githubusercontent.com/24278948/49657927-ffce7d00-fa6a-11e8-9e72-c222bf77deb7.JPG"></p>
<ul>
 <li> The sessionData contains the user ID as well so that we can keep track of who is creating this session </li>
 <li> Clicking Create Room takes to the chatroom</li>
 <li> We can also notice that creating room saves the name of the session in history</li>
</ul>
<h4> SEARCH ROOM </h4>
<ul>
 <li> Dynamically generates a form to search session </li>
 <li> Fetches sessionID from database with seach key</li>
</ul>
<p align="center"><img src="https://user-images.githubusercontent.com/24278948/49658222-c2b6ba80-fa6b-11e8-9e85-4770388653f5.JPG"></p>
<hr>
<h3 align="center"> CHATROOM </h3>
<p align="center"><img src="https://user-images.githubusercontent.com/24278948/49658499-6c964700-fa6c-11e8-9b35-dfb023556255.JPG"></p>
<ul>
 <li> Socket is implemented in this section</li>
 <li> Fetches Session name currently in use </li>
 <li> There's a timer set to 900s (15mins). When the page is first loaded, user cannot send messages unless the user clicks start</li>
 <li> When the time stops, or when user clicks stop, the input form will be disabled again</li>
</ul>
<p align="center"><img src="https://user-images.githubusercontent.com/24278948/49659199-de22c500-fa6d-11e8-829e-3ec14c608092.JPG"></p>
<ul>
 <li> When the user has clicked start and sends message, the message is saved in session schema with userID who had sent it</li>
</ul>
