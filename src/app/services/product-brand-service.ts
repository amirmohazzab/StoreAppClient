import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../models/IBrand';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductBrandService {
  
  adminBackendUrl = `${environment.apiUrl}/admin`;
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.adminBackendUrl}/productBrand/getAll`);
  }

  getById(id: number): Observable<IBrand> {
    return this.http.get<IBrand>(`${this.adminBackendUrl}/productBrand/${id}`);
  }

  create(model: IBrand): Observable<any> {
    return this.http.post(`${this.adminBackendUrl}/productBrand/create`, model);
  }

  update(id: number, model: IBrand): Observable<any> {
    return this.http.put(`${this.adminBackendUrl}/productBrand/update`, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.adminBackendUrl}/productBrand/${id}`);
  }
}
