import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNumber:BehaviorSubject<number> =new BehaviorSubject(0)

  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;
  myToken:any=localStorage.getItem('etoken')

  addToCart(proId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl+'cart',
    {
      productId:proId
    }
    )
  }


  getCartUser():Observable<any>{
    return this._HttpClient.get(this.baseUrl+'cart'
    )
  }

  removeCartItem(proId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`cart/${proId}`
    )
  }


  Updatecartquantity (proId:string,no:any):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`cart/${proId}`,{
      count: `${no}`
    }
    )
  }
  

  removeCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`cart`
    
    )
  }

  checkOut(cartId:any,orderInfo:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+
      `orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress:orderInfo
    }

      )
  }
}
