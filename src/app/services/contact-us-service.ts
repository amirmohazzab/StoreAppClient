import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdminContactMessage, IAdminContactConversation } from '../models/IAdminContactMessage';
import { BehaviorSubject, tap } from 'rxjs';
import { IPagination } from '../models/IPagination';
import { IAdminContactMessageFilter } from '../models/ContactMessage';
import { ContactMessageParams } from '../models/contactMessageParams';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  private adminBackendUrl = `${environment.apiUrl}/admin`;

  private unreadCountSource = new BehaviorSubject<number | null>(null);
  unreadCount$ = this.unreadCountSource.asObservable();
  private contactMessageParams = new ContactMessageParams();

  constructor(private http: HttpClient){}

  getContactMessages(filter: IAdminContactMessageFilter) {
    let params = new HttpParams();

    if (filter.isRead !== null && filter.isRead !== undefined)
      params = params.append('isRead', filter.isRead);

    if (filter.search)
      params = params.append('search', filter.search);

    params = params.append('pageNumber', filter.pageNumber);
    params = params.append('pageSize', filter.pageSize);

    return this.http.get<IPagination<IAdminContactConversation>>(`${this.adminBackendUrl}/contact/contact-messages`,{ params });
  }

  updateContactMessageParams(params: ContactMessageParams){
    this.contactMessageParams = params;
  }

  changeMessageStatus(id: number, isRead: boolean) {
    return this.http.put(`${this.adminBackendUrl}/contact/contact-messages/${id}/status`, null, { params: { isRead } });
  }

  getUnreadCount() {
    return this.http.get<number>(`${this.adminBackendUrl}/contact/admin-unread-message-count`)
    .pipe(tap(count => this.unreadCountSource.next(count)));
  }

  deleteMessage(id: number, wasUnread: boolean) {
    return this.http.delete(`${this.adminBackendUrl}/contact/${id}`).pipe(tap(() => {
      if (wasUnread){
        const current = this.unreadCountSource.value;
        if(current> 0){
          this.unreadCountSource.next(current - 1);
        }
      }
    }))
  }

  markAsRead(id: number) {
    return this.http.put<void>(`${this.adminBackendUrl}/contact/${id}/read`, {}).pipe(tap(() => {
      const current = this.unreadCountSource.value;
      if (current > 0) {
        this.unreadCountSource.next(current - 1);
      }
    }))
  }

  markAsUnread(id: number) {
    return this.http.put<void>(`${this.adminBackendUrl}/contact/${id}/unread`, {}).pipe(tap(() => {
      const current = this.unreadCountSource.value;
        this.unreadCountSource.next(current + 1);
    }))
  }

  reply(conversationId: number, text: string, files: File[]=[]) {

    const formData = new FormData();
    formData.append('Message', text);

     files.forEach(file => {
      formData.append('Attachments', file);
    });

    return this.http.post<IAdminContactMessage>(
      `${this.adminBackendUrl}/contact/conversations/${conversationId}/reply`,
      formData
    );
  }

  getConversations(filter: any) {

    let params = new HttpParams()
    .set('pageNumber', filter.pageNumber ?? 1)
    .set('pageSize', filter.pageSize ?? 5);

    if (filter.search)
      params = params.set('search', filter.search);

    if (filter.isRead !== null && filter.isRead !== undefined)
      params = params.set('isRead', filter.isRead);

    return this.http.get<IPagination<IAdminContactConversation>>(`${this.adminBackendUrl}/contact/conversations`, {params});
  }

  getMessages(conversationId: number) {
    return this.http.get<IAdminContactMessage[]>(`${this.adminBackendUrl}/contact/conversations/${conversationId}/messages`);
  }

  markAdminMessagesAsRead(conversationId: number) {
    return this.http.put<void>(`${this.adminBackendUrl}/contact/conversations/${conversationId}/mark-admin-read`, {});
  }

  deleteConversation(id: number){
    return this.http.delete<void>(`${this.adminBackendUrl}/contact/conversations/${id}`)
  }

  decreaseUnreadCount() {
    const current = this.unreadCountSource.value;
    this.unreadCountSource.next(current > 0 ? current - 1 : 0);
  }


}





