import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  count:BehaviorSubject<any> = new BehaviorSubject(0)

  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;

  constructor(private _HttpClient:HttpClient)  { }


addToWishlist(proId:string|null):Observable<any>{
  return this._HttpClient.post(this.baseUrl+'wishlist',{
    productId: proId
})
}

getWhishList():Observable<any>{
  return this._HttpClient.get(this.baseUrl+"wishlist")
}

removeProductFromWishlist(proId:any):Observable<any>{
  return this._HttpClient.delete(this.baseUrl+"wishlist/"+`${proId}`)
}

}
