
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7002/api/UserClasses'; // Replace with your API URL


  constructor(private http: HttpClient) {}
  getUsers():Observable<any>{
    return this.http.get(this.baseUrl);
  }
  postUser(userObj:any):Observable<any>{
  return  this.http.post(this.baseUrl, userObj)
  }
  getUserById(userId:string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }
  getUserId(username: string | null): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/id/${username}`);
  }
  deleteUser(userId:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${userId}`)
  }
  updateUserProfile(userId: string | null, profileData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userId}`, profileData);
  }
}
