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

  constructor(private http: HttpClient, private router: Router){}

  login(login: Login) : Observable<IUser> {
    return this.http.post<IUser>(`${this.backendUrl}/account/login`, login).pipe(map(res => {
      if (res){
        this.setCurrentUser(res);
        return res;
      }
      return null;
    }))
  }

  register(register: Register){
    return this.http.post<IUser>(`${this.backendUrl}/account/login`, register).pipe(map((res: IUser) => {
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
    this.router.navigateByUrl('/login');
  }

  setCurrentUser(user: IUser){
    if (user){
      localStorage.setItem('user_token', JSON.stringify(user));
      this.currentUser.next(user);
    }
  }

  getAddresses() {
    return this.http.get<IAddress[]>(`${this.backendUrl}/account/getAddresses`)
  }

  addAddress(address: IAddAddress) : Observable<IAddress> {
    return this.http.post<IAddress>(`${this.backendUrl}/account/createAddress`, address);
  }



}
