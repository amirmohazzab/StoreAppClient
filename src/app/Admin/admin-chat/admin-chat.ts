import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat-service';
import { AdminChatService } from '../../services/admin-chat-service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ChatMessage } from '../../models/ChatMessage';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './admin-chat.html',
  styleUrl: './admin-chat.scss'
})
export class AdminChat implements OnInit{

  chats:any[] = [];
  selectedChatId!:number;
  messages:any[] = [];
  message='';
  selectedChat: any = null;
  selectedFile: File | null = null;

  constructor(public adminChatService:AdminChatService, private chatService:ChatService){}

  ngOnInit(): void {

    this.chatService.startConnection()
    .then(()=>{
        this.chatService.onReceiveMessage(message=>{

            if (message.chatRoomId === this.selectedChatId) {

                this.messages.push(message);
            }
        });

        this.chatService.onAdminChatNotification(notification=>{
          const chat = this.chats.find(x => x.id === notification.chatRoomId);

          if (!chat) {
              return;
          }

          chat.lastMessage = notification.message;
          chat.lastMessageDate = notification.createDate;

          // If admin is NOT currently viewing this chat,
          // increase unread count.
          if (this.selectedChatId !== notification.chatRoomId) {
              chat.unreadCount++;
          }
        });

        this.loadChats();
    });
  }

  loadChats(){
  this.adminChatService
    .getChats()
    .subscribe({
      next:data=>{
        console.log("ADMIN CHATS:", data);
        this.chats=data;
      },
      error:err=>{
        console.log(err);
      }
    });
}

  selectChat(chat:any){

    this.selectedChatId = chat.id;
    this.selectedChat = chat;

    this.messages = [];

    this.adminChatService
        .getMessages(chat.id)
        .subscribe(messages=>{

           console.log(
            "ADMIN API MESSAGES:",
            messages
        );

        const attachedMessage =
            messages.find(
                x => x.id === 42
            );

        console.log(
            "MESSAGE 42:",
            attachedMessage
        );


        console.log(
            "MESSAGE 42 ATTACHMENTS:",
            attachedMessage?.attachments
        );

            this.messages = messages;
            
            this.adminChatService
              .markMessagesAsRead(chat.id)
              .subscribe(() => {

                    chat.unreadCount = 0;

                });
        });

    this.chatService
        .joinRoom(chat.id)
        .then(()=>{
            console.log(
              "Admin joined room:",
              chat.id
            );
        });
  }


  sendMessage() {

    if (!this.message.trim()) {
        return;
    }

    this.chatService.sendMessage(this.selectedChatId, this.message).then(() => {
        this.message='';
    });
  }

  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];
    console.log("Selected file:", this.selectedFile.name);
  }

  isImage(contentType:string):boolean {
    return contentType.startsWith("image/");
  }

}
