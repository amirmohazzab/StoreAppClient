import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChatMessageDto } from '../models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private backendUrl = environment.chatHubUrl;
  private apiUrl = environment.apiUrl;
  private hubConnection!: HubConnection;
  private receiveMessageHandler?: (message:any)=>void;
  private adminChatNotificationHandler: ((notification: any) => void) | null = null;

  constructor(private http: HttpClient) { }

   startConnection(): Promise<void> {

    if (!this.hubConnection) {

        this.hubConnection =
            new HubConnectionBuilder()
                .withUrl(this.backendUrl, {
                    accessTokenFactory: () => {

                        const raw =
                            localStorage.getItem('user_token');

                        if (!raw) {
                            return '';
                        }

                        const jwt =
                            JSON.parse(raw).token;

                        return jwt;
                    }
                })
                .withAutomaticReconnect()
                .build();
    }


    if (
        this.hubConnection.state ===
        HubConnectionState.Connected
    ) {
        return Promise.resolve();
    }


    if (
        this.hubConnection.state ===
        HubConnectionState.Connecting
    ) {
        return new Promise((resolve, reject) => {

            const checkConnection = () => {

                if (
                    this.hubConnection?.state ===
                    HubConnectionState.Connected
                ) {

                    resolve();

                }
                else if (
                    this.hubConnection?.state ===
                    HubConnectionState.Disconnected
                ) {

                    reject(
                        new Error(
                            'SignalR connection failed.'
                        )
                    );

                }
                else {

                    setTimeout(
                        checkConnection,
                        100
                    );
                }
            };

            checkConnection();
        });
    }


    return this.hubConnection
        .start()
        .then(() => {

            console.log(
                'SignalR connected'
            );

        })
        .catch(err => {

            console.error(
                'SignalR connection error:',
                err
            );

            this.hubConnection = null;

            throw err;
        });
}

  joinRoom(chatRoomId:number){
    if (!this.hubConnection) {

        throw new Error(
            'SignalR connection is not initialized.'
        );
    }

    if (
        this.hubConnection.state !==
        HubConnectionState.Connected
    ) {

        throw new Error(
            `Cannot join room. SignalR state is ${this.hubConnection.state}`
        );
    }

    return this.hubConnection.invoke(
        'JoinChatRoom',
        chatRoomId
    );
  }

  leaveRoom(chatRoomId:number){
    return this.hubConnection.invoke("LeaveChatRoom", chatRoomId);
  }

  sendMessage(chatRoomId:number, message:string){
    if(!this.hubConnection){
      throw new Error("SignalR connection is not initialized");
    }

    return this.hubConnection.invoke<ChatMessageDto>("SendMessage", chatRoomId, message);
  }

  startChat(): Observable<any>{
    return this.http.post(`${environment.apiUrl}/chat/start`, {});
  }

  getMessages(chatRoomId:number){
    return this.http.get<any[]>(`${environment.apiUrl}/chat/${chatRoomId}/messages`);
  }

  stopConnection(){
    if(this.hubConnection){
      this.hubConnection.stop();
    }
  }

  public onReceiveMessage(callback: (message:any)=>void) {

     console.log("REGISTER ReceiveMessage LISTENER");

    if (!this.hubConnection) {
        console.error("Hub connection is not initialized");
        return;
    }

    this.hubConnection.off("ReceiveMessage");

    this.hubConnection.on(
        "ReceiveMessage",
        callback
    );
  }

  markMessagesAsRead(chatRoomId:number) {
    return this.http.put(`${this.apiUrl}/chat/${chatRoomId}/read`, {});
  }

public onAdminChatNotification(callback: (notification: any) => void) 
{
    console.log("REGISTER AdminChatNotification LISTENER");

    if (!this.hubConnection) {
        console.error("Hub connection is not initialized");
        return;
    }

    if (this.adminChatNotificationHandler) {
        this.hubConnection.off(
            "ReceiveAdminChatNotification",
            this.adminChatNotificationHandler
        );
    }

    this.adminChatNotificationHandler = callback;

    this.hubConnection.on("ReceiveAdminChatNotification", this.adminChatNotificationHandler);
}

uploadAttachment(chatMessageId: number, file: File) 
{
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/chat/${chatMessageId}/attachments`, formData);
}

getAttachmentUrl(path: string): string {
    console.log("Attachment path received:", path);

    const url = environment.imageBaseUrl + path;

    console.log("Generated attachment URL:", url);

    return url;
}



  


}
