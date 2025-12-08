import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddress } from '../models/Address';
import { IUserLike } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../models/IProduct';
import { IReview } from '../models/IReview';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  
  private backendUrl = "https://localhost:7096/api";

  private likedProductsSource = new BehaviorSubject<IProduct[]>([]);
  likedProducts$ = this.likedProductsSource.asObservable();
  
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

  
}
