import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRole } from '../models/IRole';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  private adminBackendUrl = 'https://localhost:5001/api/admin';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(`${this.adminBackendUrl}/role`);
  }

  getRoleById(id: string): Observable<IRole> {
    return this.http.get<IRole>(`${this.adminBackendUrl}/role/${id}`);
  }

  createRole(role: IRole): Observable<IRole> {
    return this.http.post<IRole>(`${this.adminBackendUrl}/role`, role);
  }

  updateRole(id: string, role: IRole): Observable<IRole> {
    return this.http.put<IRole>(`${this.adminBackendUrl}/role/${id}`, role);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.adminBackendUrl}/role/${id}`);
  }

  getRolePermissions(roleId: string) {
    return this.http.get<number[]>(`${this.adminBackendUrl}/role/${roleId}/permission`);
  }

  updateRolePermissions(roleId: string, permissionIds: number[]) {
    return this.http.post(`${this.adminBackendUrl}/role/${roleId}/permission`, { permissionIds });
  }
}
