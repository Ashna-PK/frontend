import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl='https://localhost:7003/api/Review'
  constructor(private http:HttpClient) { 
 
  }
  postReview(reviewDetails:any):Observable<any>
  {
    return this.http.post(this.baseUrl,reviewDetails);
  }
}
