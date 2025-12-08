import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from '../models/IPagination';
import { IAdminUser } from '../models/IAdminUser';
import { IPermission } from '../models/IPermission';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private adminBackendUrl = "https://localhost:7096/api/admin";

  constructor(private http: HttpClient) {}

   getUsers(pageIndex: number = 1, pageSize: number = 5, search: string, sort: string): Observable<IPagination<IAdminUser>> {
    
     let params = new HttpParams()
       .set('pageIndex', pageIndex)
       .set('pageSize', pageSize);

     if (search) params = params.set('search', search);
     if (sort) params = params.set('sort', sort);

     return this.http.get<IPagination<IAdminUser>>(`${this.adminBackendUrl}/user`, { params });
   }

  // getUsers(query) {
  //   return this.http.get<IPagination<IAdminUser>>(`${this.adminBackendUrl}/user`, {params: query});
  // }

  getUserById(id: string): Observable<IAdminUser> {
    return this.http.get<IAdminUser>(`${this.adminBackendUrl}/user/${id}`);
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.adminBackendUrl}/user/${id}`);
  }

  updateUser(id: string, data: any): Observable<boolean> {
    return this.http.put<boolean>(`${this.adminBackendUrl}/user/${id}`, data);
  }

  getUserPermissions(userId: string): Observable<IPermission[]> {
    return this.http.get<IPermission[]>(`${this.adminBackendUrl}/user/${userId}/permission`);
  }

updateUserPermissions(userId: string, permissionIds: number[]): Observable<any> {
  return this.http.put(
    `${this.adminBackendUrl}/user/${userId}/permission`,
    permissionIds   // فقط آرایه
  );
}

  getAllPermissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.adminBackendUrl}/role/permission`);
  }

  

  
}
