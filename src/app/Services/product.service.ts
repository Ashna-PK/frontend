import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  private baseUrl='https://localhost:7003/api/Product';
  getProductByShop(shopId:any):Observable<any>
  {
      return this.http.get<any[]>(this.baseUrl+'/shop?shopId=' + shopId)
  }
}
