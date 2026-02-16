import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../models/IProduct';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  private backendUrl = "https://localhost:7096/api";
  constructor(private http: HttpClient){}

  private refreshMessageSource = new BehaviorSubject<void>(undefined);
  refreshMessage$ = this.refreshMessageSource.asObservable();

  getFeatured(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.backendUrl}/home/all`,{});
  }

  getMostLiked(count: number = 6): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.backendUrl}/home/most-liked?count=${count}`);
  }

  getMostViewed(count: number = 6): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.backendUrl}/home/most-viewed?count=${count}`);
  }

  getAboutUs() : Observable<boolean>{
    return this.http.get<any>(`${this.backendUrl}/home/about-us`);
  }

  notifyNewMessage(){
    this.refreshMessageSource.next;
  }

}
  
  
