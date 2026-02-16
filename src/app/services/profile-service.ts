import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddress } from '../models/Address';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { IProduct } from '../models/IProduct';
import { IReview } from '../models/IReview';
import { UserContactConversation, UserContactMessage } from '../models/ContactMessage';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  
  private backendUrl = "https://localhost:7096/api";

  private likedProductsSource = new BehaviorSubject<IProduct[]>([]);
  likedProducts$ = this.likedProductsSource.asObservable();

  private conversationsSource = new BehaviorSubject<UserContactConversation[]>([]);
  conversations$ = this.conversationsSource.asObservable();
  
  constructor(private http: HttpClient){}

   getOrdersForClient(){
     return this.http.get<any>(`${this.backendUrl}/order/getOrdersForUser`);
   }

  getBasketsForClient(){
    return this.http.get<any>(`${this.backendUrl}/basket/getBasketsForUser`);
  }

  getUserProfile() {
    return this.http.get<IAddress>(`${this.backendUrl}/user/me`);
  }

  updateUserProfile(data: any) {
    return this.http.put<IAddress>(`${this.backendUrl}/user/update-profile`, data);
  }

  // toggleLike(productId: number) : Observable<{ liked: boolean }> {
  //   return this.http.post<{ liked: boolean }>(`${this.backendUrl}/userLike/toggle/${productId}`, {});
  // }

  getLikedProducts() : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.backendUrl}/userLike/liked-products`);
  }

   getUserReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.backendUrl}/account/review`);
  }

  deleteReview(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.backendUrl}/account/review/${id}`);
  }

  getUserConversations() {
    return this.http.get<UserContactConversation[]>(`${this.backendUrl}/account/conversations`);
  }

  sendMessage(formData: FormData): Observable<boolean> {
  return this.http.post<boolean>(`${this.backendUrl}/home/contact-us`, formData)
    .pipe(switchMap(() => this.getUserConversations()),
      map(() => true)
  );
}

  markMessageAdRead(messageId: number) {
    return this.http.put<any>(`${this.backendUrl}/contact/messages/${messageId}/read`, {});
  }

getConversationMessages(conversationId: number) {
  return this.http.get<UserContactMessage[]>(`${this.backendUrl}/user/conversations/${conversationId}/messages`);
}

  markAdminMessagesAsRead(conversationId: number) {
  return this.http.put<void>(`${this.backendUrl}/account/conversations/${conversationId}/mark-admin-read`, {});
}

  
}
