import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interface/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { Category } from 'src/app/core/interface/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CuttextPipe,CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

  
})
export class HomeComponent implements OnInit {
constructor(private _ProductService:ProductService ,private _CartService:CartService
  ,private toastr: ToastrService  ,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}

products:Product[]=[]
catgories:Category[]=[]
term:string=''

ngOnInit(): void {

  this._ProductService.getProducts().subscribe({
    next:(response)=>{
      console.log(response.data)
      this.products=response.data
    }
  })
  this._ProductService.getCategories().subscribe({
    next:(response)=>{
      console.log(response)
      this.catgories=response.data
    }
  })
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
      items: 2
    },
    400: {
      items: 3
    },
    740: {
      items: 4
    },
    940: {
      items: 6
    }
  },
  nav: false
}

mainSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout:5000,
  autoplaySpeed:1000,
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

addToWishlist(proId:any,element:HTMLElement){
  this._WishlistService.addToWishlist(proId).subscribe({
    next:(response)=>{
this._Renderer2.removeClass(element,"fa-regular")
this._Renderer2.addClass(element,"fa-solid")
this._Renderer2.addClass(element,"text-danger")
this._WishlistService.count.next(response.data.length)
console.log(response.data.length)
this.toastr.success(response.message);  
    }
  })
}
}
