import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
constructor(private  _ActivatedRoute:ActivatedRoute,private _ProductService:ProductService,private _CartService:CartService,private toastr: ToastrService
  ,private _Renderer2:Renderer2) {}
productId!:string|null;
productDetails:any=null


ngOnInit():void{
this._ActivatedRoute.paramMap.subscribe({
  next:(params)=>{
    this.productId=params.get('id')
    console.log(this.productId)
  }
})

this._ProductService.getProductDetails(this.productId).subscribe({next:(response)=>{
console.log(response)
this.productDetails=response.data}
})
}


categoryOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay:true,
  autoplayTimeout:7000,
  autoplaySpeed:1000,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    }
  },
  nav: false
}


addProduct (proId:any,element:HTMLButtonElement){
  this._Renderer2.setAttribute(element,'disabled','true')
  
  
    this._CartService.addToCart(proId).subscribe({
  next:(response)=>{
  console.log(response)
  console.log(response.message)
  this.toastr.success(response.message);
  this._Renderer2.removeAttribute(element,'disabled')
  this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:(err)=>{
  this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  }
}
