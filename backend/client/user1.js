// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlBEb0paSTVzUSIsImlhdCI6MTYwNjU4NjczMDgwNSwiZXhwIjoxNjA2NjczMTMwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6ImNMVlVWNUc1WiIsImZpcnN0TmFtZSI6InRlc3QxIiwibGFzdE5hbWUiOiJ0ZXN0MSIsInVzZXJOYW1lIjoidGVzdDEiLCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6MH19.WziOFNyvQIzpvozvxfWKbPWwfLaKcatulD-P1IbPesI"
const userId = "cLVUV5G5Z"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'SJ-iectqM',//putting user2's id here 
  receiverName: "Aditya Kumar",
  senderId: userId,
  senderName: "Mr Xyz"
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

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });

  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Mr Xyz")

  })




}// end chat socket function

chatSocket();
