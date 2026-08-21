import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from '../models/Address';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(`${this.backendUrl}/user/address`);
  }

  getById(id: number): Observable<IAddress> {
    return this.http.get<IAddress>(`${this.backendUrl}/user/address/${id}`);
  }

  create(data: IAddress): Observable<any> {
    return this.http.post(`${this.backendUrl}/user/create-address`, data);
  }

  update(id: number, data: IAddress): Observable<IAddress> {
    return this.http.put<IAddress>(`${this.backendUrl}/user/address/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/user/address/${id}`);
  }
}
