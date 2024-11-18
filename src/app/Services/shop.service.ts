import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://localhost:7003/api/shop';
  getShops():Observable<any>{
    return this.http.get(this.baseUrl);
  }
  verifySeller(id:number,rating:number){
    return this.http.put(`${this.baseUrl}/admin/verify?id=${id}&verify=${true}&rating=${rating}`,{})
  }
  getShopId(username:string|null):Observable<any>{
    return this.http.get(this.baseUrl+'/id/'+username)
  }
  postSeller(userObj:any):Observable<any>{
  return  this.http.post(this.baseUrl, userObj)
  }
  getAllShops():Observable<any>{
    return this.http.get(this.baseUrl+'/all');
  }
  deleteShop(shopId:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${shopId}`)
  }
  putShop(shopId:number,shopDetails:any):Observable<any>{
    return  this.http.put(`${this.baseUrl}/${shopId}`, shopDetails)
  }
}
