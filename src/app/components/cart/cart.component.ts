import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cartDetails:any=null
empty:any=false
constructor(private _CartService:CartService , private _Renderer2:Renderer2,private toastr: ToastrService){}
  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next:(response)=>{
        console.log(response)
        if(response.numOfCartItems>0){
          this.cartDetails=response.data
        }else{
          this.empty=true
          this.cartDetails=null
        }
      },error:(err)=>{
        this.empty=true
        this.cartDetails=null
      }
      }
    )
  }


  removeItem(id:string,element:HTMLButtonElement):any{
    this._Renderer2.setAttribute(element,"disabled","true")
    this._CartService.removeCartItem(id).subscribe({
      next:(response)=>{
        if(response.numOfCartItems>0){
          this.cartDetails=response.data
          console.log(response)
          this.toastr.success(response.status);
          this._Renderer2.removeAttribute(element,"disabled")
          this._CartService.cartNumber.next(response.numOfCartItems)
        }else{
          this.empty=true
          this.cartDetails=null
          this._Renderer2.removeAttribute(element,"disabled")
        }
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,"disabled")
        this.toastr.error("Please Try Later");
      }
    })
  }

  Updatecartquantity(id:string,count:any,element1:HTMLButtonElement,element2:HTMLButtonElement){
if(count>=1){
  this._Renderer2.setAttribute(element1,"disabled","true")
  this._Renderer2.setAttribute(element2,"disabled","true")
  this._CartService.Updatecartquantity(id,count).subscribe({
    next:(response)=>{
      console.log(response)
      if(response.numOfCartItems>0){
        this._Renderer2.removeAttribute(element1,"disabled")
        this._Renderer2.removeAttribute(element2,"disabled")
        this.cartDetails=response.data
        this.toastr.success(response.status);
      }else{
        this.empty=true
      }
    },error:(err)=>{
      this._Renderer2.removeAttribute(element1,"disabled")
      this._Renderer2.removeAttribute(element2,"disabled")
    }
  })
}else{
  this.toastr.warning("The Mini Item Is Atleast One");
}
   
  }

removeCart(){
    this._CartService.removeCart().subscribe({
      next:()=>{
        this.cartDetails=null
        this.empty=true
        this._CartService.cartNumber.next(0)
      }
    })
  }
}
