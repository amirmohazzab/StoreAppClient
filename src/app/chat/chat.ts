import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat-service';
import { FormsModule, NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ChatMessage, ChatMessageDto } from '../models/ChatMessage';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat implements OnInit {

  chatRoomId !: number;
  message = '';
  messages: ChatMessage[] = [];
  isChatOpen = false;
  private messageListenerRegistered = false;
  selectedFile: File | null = null;
  attachments: [];
  selectedChat: any = null;
  currentUserId!: string;
  

   constructor(public chatService: ChatService) { }

    ngOnInit(): void {
       
    }

    getUserIdFromToken(): string {

    const storedToken = localStorage.getItem('user_token');

    if (!storedToken) {
        return '';
    }

    try {

        const authData = JSON.parse(storedToken);

        const token = authData.token;

        if (!token) {
            console.error('JWT token not found inside user_token');
            return '';
        }

        const payload = JSON.parse(
            atob(
                token.split('.')[1]
                    .replace(/-/g, '+')
                    .replace(/_/g, '/')
            )
        );

        // console.log('JWT PAYLOAD:', payload);
        // console.log('CURRENT USER ID:', payload.nameid);

        return payload.nameid || payload.sub || '';

    } catch (error) {

        console.error('JWT decode error:', error);

        return '';
    }
}

    sendMessage() {

        if (!this.message.trim()) {
            return;
        }
        this.chatService.sendMessage(this.chatRoomId, this.message).then(() => {
            this.message = '';
        }).catch(err => {
            console.error(err);
        });
    }

    ngOnDestroy(): void {

        if (this.chatRoomId) {
            this.chatService.leaveRoom(this.chatRoomId);
        }
        this.chatService.stopConnection();
    }

    openChat() {
        
        console.log("OPEN CHAT CALLED");

        this.currentUserId = this.getUserIdFromToken();

        this.isChatOpen = true;

        this.chatService.startConnection()
        .then(() => {

            if (!this.messageListenerRegistered) {

                this.chatService.onReceiveMessage(message => {

                    this.messages.push(message);
                });

                this.messageListenerRegistered = true;
            }

            console.log("signalr registered");
            this.startChat();

        });
    }

    startChat() {
  this.chatService.startChat().subscribe({
    next: result => {

      this.chatRoomId = result.chatRoomId;

      this.chatService.joinRoom(this.chatRoomId)
        .then(() => {

          console.log(
            'Customer joined room:',
            this.chatRoomId
          );

          this.chatService
            .getMessages(this.chatRoomId)
            .subscribe({
              next: messages => {

                this.messages = messages;
              },
              error: err => {
                console.error(
                  'Error loading messages:',
                  err
                );
              }
            });

          this.chatService
            .markMessagesAsRead(this.chatRoomId)
            .subscribe();
        });
    },
    error: err => {
      console.error(
        'Error starting chat:',
        err
      );
    }
  });
    }

    closeChat() {
    this.isChatOpen = false;
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
