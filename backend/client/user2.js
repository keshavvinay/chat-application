// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Imw2c1hzbXIxdCIsImlhdCI6MTYwNjU4NzA2MjIzMywiZXhwIjoxNjA2NjczNDYyLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IlZhdUNsRWFGeCIsImZpcnN0TmFtZSI6InRlc3QyIiwibGFzdE5hbWUiOiJ0ZXN0MiIsInVzZXJOYW1lIjoidGVzdDIiLCJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6MH19.GrDBLNT8Kl5sYBcW-NkikumNJW4j3DsmOhqEQJVWdss"
const userId= "VauClEaFx"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'cLVUV5G5Z',//putting user2's id here 
  receiverName: "Mr Xyz",
  senderId: userId,
  senderName: "Aditya Kumar"
}

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)

  });


  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Aditya Kumar")

  })

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });



}// end chat socket function

chatSocket();
