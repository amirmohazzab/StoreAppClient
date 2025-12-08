import { Injectable } from '@angular/core';
import { IPermission } from '../models/IPermission';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/User';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  
  adminBackendUrl = 'https://localhost:7096/api/admin';
  private currentUser: IUser | null = null;

  constructor(private http: HttpClient, private accountService: AccountService) {
     this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

   hasPermission(permission: string): boolean {
    if (!this.currentUser || !this.currentUser.permission) return false;
    return this.currentUser.permission.includes(permission);
  }

  getAll(): Observable<IPermission[]> {
    return this.http.get<IPermission[]>(`${this.adminBackendUrl}/permission`);
  }

  create(dto: { name: string; description?: string }) {
    return this.http.post(`${this.adminBackendUrl}/permission`, dto);
  }

  update(id: number, dto: { id: number; name: string; description?: string }) {
    return this.http.put(`${this.adminBackendUrl}/permission/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${this.adminBackendUrl}/permission/${id}`);
  }

  assignToRole(roleId: string, permissionId: number) {
    return this.http.post(`${this.adminBackendUrl}/role/${roleId}/assign`, permissionId);
  }

  removeFromRole(roleId: string, permissionId: number) {
    return this.http.post(`${this.adminBackendUrl}/role/${roleId}/remove`, permissionId);
  }

  getRolePermissions(roleId: string) {
    return this.http.get<string[]>(`${this.adminBackendUrl}/role/${roleId}`); // optional endpoint
  }
}
