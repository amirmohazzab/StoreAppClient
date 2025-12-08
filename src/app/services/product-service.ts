import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/IProduct';
import { IAdminProduct } from '../models/IAdminProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private adminBackendUrl = "https://localhost:7096/api/admin";

  constructor(private http: HttpClient){}

  getProducts(): Observable<IAdminProduct[]> {
    return this.http.get<IAdminProduct[]>(`${this.adminBackendUrl}/product/getAll`);
  }

  
  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.adminBackendUrl}/product/get/${id}`);
  }

 
  private buildFormData(data: any): FormData {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (key === 'gallery' && data.gallery?.length > 0) {
        data.gallery.forEach((file: File) => {
          formData.append('gallery', file, file.name);
        });
      }
      else if (key === 'mainImage' && data.mainImage) {
        formData.append('mainImage', data.mainImage, data.mainImage.name);
      }
      else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    return formData;
  }

 
  createProduct(product: any): Observable<number> {
    const formData = this.buildFormData(product);
    return this.http.post<number>(`${this.adminBackendUrl}/product/create`, formData);
  }

  // updateProduct(product: any): Observable<boolean> {
  //   const formData = this.buildFormData(product);
  //   return this.http.put<boolean>(`${this.adminBackendUrl}/product/update`, formData);
  // }

  updateProduct(formData: FormData): Observable<any> {
    return this.http.put(`${this.adminBackendUrl}/product/update`, formData);
  }

  
  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.adminBackendUrl}/product/delete/${id}`);
  }
}
