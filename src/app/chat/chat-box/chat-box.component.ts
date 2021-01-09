import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './../../socket.service';
import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatMessage } from './chat';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {

  @ViewChild('scrollMe', { read: ElementRef })

  public scrollMe: ElementRef;



  public authToken: any;
  public userInfo: any;
  public userList: any = [];
  public disconnectedSocket: boolean;

  public scrollToChatTop: boolean = false;

  public receiverId: any;
  public receiverName: any;
  public previousChatList: any = [];
  public messageText: any;
  public messageList = []; // stores the current message list display in chat box
  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;

  constructor(public AppService: AppService, public SocketService: SocketService, public cookie: CookieService, public router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    // this.messageText = 'hello world'
    this.authToken = this.cookie.get('authtoken');

    this.userInfo = this.AppService.getUserInfoFromLocalstorage();

    // console.log(this.userInfo)

    this.receiverId = this.cookie.get("receiverId");

    this.receiverName = this.cookie.get('receiverName');

    console.log(this.receiverId, this.receiverName)

    if (this.receiverId != null && this.receiverId != undefined && this.receiverId != '') {
      this.userSelectedToChat(this.receiverId, this.receiverName)
    }

    // this.checkStatus();

    this.verifyUserConfirmation();
    this.getOnlineUserList()
    this.getMessageFromAUser()


  }

  public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;

        this.SocketService.setUser(this.authToken);
        this.getOnlineUserList()
      });
  }

  public userSelectedToChat: any = (id, name) => {

    console.log("setting user as active")

    // setting that user to chatting true   
    this.userList.map((user) => {
      if (user.userId == id) {
        user.chatting = true;
      }
      else {
        user.chatting = false;
      }
    })

    this.cookie.set('receiverId', id);

    this.cookie.set('receiverName', name);


    this.receiverName = name;

    this.receiverId = id;

    this.messageList = [];

    this.pageValue = 0;

    let chatDetails = {
      userId: this.userInfo.userId,
      senderId: id
    }


    this.SocketService.markChatAsSeen(chatDetails);

    // this.getPreviousChatWithAUser();

  } // end userBtnClick function

  public getOnlineUserList: any = () => {

    this.SocketService.onlineUserList()
      .subscribe((userListRes: any) => {

        this.userList = [];

        for (let x in userListRes) {
          let temp = { 'userId': userListRes[x].userId, 'name': userListRes[x].fullName, 'unread': 0, 'chatting': false };

          this.userList.push(temp);

        }

        // console.log(this.userList);

      }); // end online-user-list
  }

  public logout: any = () => {

    this.AppService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          console.log("logout called")
          this.cookie.delete('authtoken');

          this.cookie.delete('receiverId');

          this.cookie.delete('receiverName');

          this.SocketService.exitSocket()

          this.router.navigate(['/']);

        } else {
          this.toastr.error(apiResponse.message)

        } // end condition

      }, (err) => {
        this.toastr.error('some error occured')


      });

  } // end logout

  public sendMessageUsingKeypress: any = (event: any) => {

    console.log(this.messageText)

    if (event.keyCode === 13) { // 13 is keycode of enter.

      this.sendMessage();

    }

  } // end sendMessageUsingKeypress

  public sendMessage: any = () => {

    if (this.messageText) {

      let chatMsgObject: ChatMessage = {
        senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: this.cookie.get('receiverName'),
        receiverId: this.cookie.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
      } // end chatMsgObject
      console.log(chatMsgObject);
      this.SocketService.SendChatMessage(chatMsgObject)
      this.pushToChatWindow(chatMsgObject)


    }
    else {
      this.toastr.warning('text message can not be empty')

    }

  } // end sendMessage
  public pushToChatWindow: any = (data) => {

    this.messageText = "";
    this.messageList.push(data);
    this.scrollToChatTop = false;


  }// end push to chat window

  public getMessageFromAUser: any = () => {

    this.SocketService.chatByUserId(this.userInfo.userId)
      .subscribe((data : {senderId, senderName, message}) => {


        (this.receiverId == data.senderId) ? this.messageList.push(data) : '';

        this.toastr.success(`${data.senderName} says : ${data.message}`)

        this.scrollToChatTop = false;

      });//end subscribe

  }// end get message from a user 

}
