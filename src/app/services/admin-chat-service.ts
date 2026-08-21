import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChatMessage, ChatMessageAttachmentDto } from '../models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class AdminChatService {
  
  private adminBackendUrl = `${environment.apiUrl}/admin/chat`;

  constructor(private http: HttpClient) {}

  getChats() {
    return this.http.get<any[]>(`${this.adminBackendUrl}/adminchat`
    );
  }

  getMessages(chatRoomId:number) {
    return this.http.get<ChatMessage[]>(`${this.adminBackendUrl}/adminchat/${chatRoomId}/messages`
    );
  }

  markMessagesAsRead(chatRoomId:number) {
    return this.http.put(`${this.adminBackendUrl}/adminchat/${chatRoomId}/read`, {});
  }

  uploadAttachment(chatMessageId: number, file: File) 
  {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ChatMessageAttachmentDto>(`${this.adminBackendUrl}/adminchat/${chatMessageId}/attachments`, formData);
  }

  getAttachmentUrl(path: string): string {
    console.log("Attachment path received:", path);

    const url = environment.imageBaseUrl + path;

    console.log("Generated attachment URL:", url);

    return url;
  }


}
