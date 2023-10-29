import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-whislist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whislist.component.html',
  styleUrls: ['./whislist.component.scss']
})
export class WhislistComponent  implements OnInit{
empty=true
  wishlistItems:any

  

  constructor(private _WishlistService:WishlistService ,private _Renderer2:Renderer2 ,private _CartService:CartService,private toastr: ToastrService){}


  ngOnInit(): void {
    this._WishlistService.getWhishList().subscribe({
      next:(response)=>{
        if(response.count!==0){
          this.wishlistItems=response
          this.empty=false
          this._WishlistService.count.next(response.count)
        }else{
          this.empty=true
          this._WishlistService.count.next(0)
        }
      },error:(err)=>{
        this.empty=true
      }
    })
  }

  addProduct (proId:any,element:HTMLButtonElement){
    this._Renderer2.setAttribute(element,'disabled','true')
      this._CartService.addToCart(proId).subscribe({
    next:(response)=>{
    this.toastr.success(response.message);
    this._Renderer2.removeAttribute(element,'disabled')
    this._CartService.cartNumber.next(response.numOfCartItems)
        },
        error:(err)=>{
    this._Renderer2.removeAttribute(element,'disabled')
        }
      })
    }


    removeProductFromWishlist(proId:any){
      this._WishlistService.removeProductFromWishlist(proId).subscribe({
        next:(response)=>{
          this.toastr.success(response.message);
          this._WishlistService.getWhishList().subscribe({
            next:(response)=>{
              if(response.count!==0){
                this.wishlistItems=response
                this.empty=false
                this._WishlistService.count.next(response.count)
              }else{
                this.empty=true
              }
            },error:(err)=>{
              this.empty=true
            }
          })

          
        }
      })
    }
}
