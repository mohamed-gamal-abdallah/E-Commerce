import { Component, ElementRef, HostListener, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive ],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
constructor(private _Router:Router,private _CartService:CartService ,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}
@ViewChild('navbar') navElement!:ElementRef


@HostListener('window:scroll')


onScroll(){

if(scrollY>300){
  this._Renderer2.addClass(this.navElement.nativeElement,"px-5")
}else
{
  this._Renderer2.removeClass(this.navElement.nativeElement,"px-5")
}
}

wishnumber:number=0
cartNumber:number=0




ngOnInit(): void {

// ==================================================================================================== 

  this._WishlistService.getWhishList().subscribe({
    next:(response)=>{
      if(response.count!==0){
        this._WishlistService.count.next(response.count)
      }else{
        this._WishlistService.count.next(0)
      }
    },error:(err)=>{
    }
  })

// ====================================================================================================  

  this._CartService.cartNumber.subscribe({
    next:(response)=>{
this.cartNumber=response
    }
  })

// ====================================================================================================  

  this._WishlistService.count.subscribe({
    next:(response)=>{
console.log(response)
this.wishnumber=response
    }
  })

// ====================================================================================================  

  this._CartService.getCartUser().subscribe({
    next:(response)=>{
      this.cartNumber=response.numOfCartItems
    }
  })
}

// ====================================================================================================  

signOut():void{
  localStorage.removeItem("etoken");
  this._Router.navigate(['/login'])
}
}

// ====================================================================================================  
