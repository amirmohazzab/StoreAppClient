import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  private backendUrl = "https://localhost:7096/api";
  constructor(private http: HttpClient){}

  getFeatured(): Observable<IProduct[]> {
    // filters?: { categoryId?: number; brandId?: number; search?: string }
    // let params = new HttpParams();

    // if (filters?.categoryId) params = params.append('categoryId', filters.categoryId);
    // if (filters?.brandId) params = params.append('brandId', filters.brandId);
    // if (filters?.search) params = params.append('search', filters.search);
    // params

    // let params = new HttpParams();
    // if (sort) params = params.set('sort', sort);
    // sort?: string
    return this.http.get<IProduct[]>(`${this.backendUrl}/home/all`,{});
  }

  getMostLiked(count: number = 6): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.backendUrl}/home/most-liked?count=${count}`);
  }

  getMostViewed(count: number = 6): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.backendUrl}/home/most-viewed?count=${count}`);
  }

  
}
