import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';  //react'da axios,fetch olarak yapılır
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl="https://localhost:44373/api/";
  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ListResponseModel<Product>>{
    let newpath=this.apiUrl + "products/getall"
    return this.httpClient.get<ListResponseModel<Product>>(newpath);
  }
  getProductsByCategory(categoryId:number):Observable<ListResponseModel<Product>>{
    let newpath=this.apiUrl + "products/getbycategory?categoryId=" +categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newpath);
  }
  add(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl +"products/add",product);
  }
}
