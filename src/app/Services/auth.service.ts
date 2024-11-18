import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private baseUrl = 'https://localhost:7001/api/AuthApi';
  isLoggedIn = false; // This variable tracks the login status

  constructor() {}

  // This method simulates logging in
  register(registerObj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register`, registerObj);
  }
  login(loginObj:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/Login`,loginObj);
  }
  // This method simulates logging out
  logout() {
    this.isLoggedIn = false;
    //Clear any stored data if necessary
  }
}
