import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdminProductCategory } from '../models/IAdminProductCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  
  adminBackendUrl = 'https://localhost:7096/api/admin';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IAdminProductCategory[]> {
    return this.http.get<IAdminProductCategory[]>(`${this.adminBackendUrl}/productCategory/getAll`);
  }

  getById(id: number): Observable<IAdminProductCategory> {
    return this.http.get<IAdminProductCategory>(`${this.adminBackendUrl}/productCategory/${id}`);
  }

  create(model: IAdminProductCategory): Observable<any> {
    return this.http.post(`${this.adminBackendUrl}/productCategory/create`, model);
  }

  update(id: number, model: IAdminProductCategory): Observable<any> {
    return this.http.put(`${this.adminBackendUrl}/productCategory/update`, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.adminBackendUrl}/productCategory/${id}`);
  }
}
