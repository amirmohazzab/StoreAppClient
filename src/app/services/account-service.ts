import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser, Login, Register } from '../models/User';
import { Router } from '@angular/router';
import { IAddAddress, IAddress } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private backendUrl = "https://localhost:7096/api";
  private currentUser = new BehaviorSubject<IUser>(null);
  public currentUser$ = this.currentUser.asObservable();
  user: IUser;

  constructor(private http: HttpClient, private router: Router){}

  login(login: Login) : Observable<IUser> {
    return this.http.post<IUser>(`${this.backendUrl}/account/login`, login).pipe(
    map(user => {
      if (!user) return null;
      this.setCurrentUser(user);
      return user;
    })
  );
  }

  register(register: Register){
    return this.http.post<IUser>(`${this.backendUrl}/account/register`, register).pipe(map((res: IUser) => {
      if (res){
         this.setCurrentUser(res);
        return res;
      }
      return null;
    }))
  }

  logout(){
    localStorage.removeItem('user_token');
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }

  setCurrentUser(user: IUser){
    if (user){
      try{
        const decoded = this.decodeToken(user.token);
        const perms = decoded['permissions'];
        user.permission = Array.isArray(perms) ? perms : (typeof perms === 'string' ? JSON.parse(perms) : []);
        user.role = decoded["role"];
      } catch {
         user.permission = [];
      }
              

      localStorage.setItem('user_token', JSON.stringify(user));
      this.currentUser.next(user);
    }
  }

  getAddresses() {
    return this.http.get<IAddress[]>(`${this.backendUrl}/user/address`);
  }

  addAddress(address: IAddAddress) : Observable<IAddress> {
    return this.http.post<IAddress>(`${this.backendUrl}/account/createAddress`, address);
  }

  private decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  changePassword(model: any) {
    return this.http.put(`${this.backendUrl}/account/change-password`, model);
  }

  getProfile() {
  return this.http.get(`${this.backendUrl}/account/profile`);
}

updateProfile(model: any) {
  return this.http.put(`${this.backendUrl}/account/profile`, model);
}

uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return this.http.post(`${this.backendUrl}/account/upload-avatar`, formData);
}

}
