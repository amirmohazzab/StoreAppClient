import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IType } from '../models/IType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
 
  adminBackendUrl = 'https://localhost:7096/api/admin';

  constructor(private http: HttpClient) {}

    getAll(): Observable<IType[]> {
      return this.http.get<IType[]>(`${this.adminBackendUrl}/productType/getAll`);
    }
  
    getById(id: number): Observable<IType> {
      return this.http.get<IType>(`${this.adminBackendUrl}/productType/${id}`);
    }
  
    create(model: IType): Observable<any> {
      return this.http.post(`${this.adminBackendUrl}/productType/create`, model);
    }
  
    update(id: number, model: IType): Observable<any> {
      return this.http.put(`${this.adminBackendUrl}/productType/update`, model);
    }
  
    delete(id: number): Observable<any> {
      return this.http.delete(`${this.adminBackendUrl}/productType/${id}`);
    }

     
}
