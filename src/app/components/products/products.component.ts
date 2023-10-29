import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interface/product';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products:Product[]=[]
  pageSize:number=0
  curentpage:number=0
  total:number=0
  constructor(private _ProductService:ProductService, private _Renderer2:Renderer2,private _CartService:CartService,private toastr:ToastrService){}

    ngOnInit(): void {
      this._ProductService.getProducts().subscribe({
        next:(response)=>{
          console.log(response.data)
          this.products=response.data
          this.pageSize=response.metadata.limit
          this.curentpage=response.metadata.currentPage
          this.total=response.results
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


    pageChanged(event:any){
      this._ProductService.getProducts(event).subscribe({
        next:(response)=>{
          console.log(response.data)
          this.products=response.data
          this.pageSize=response.metadata.limit
          this.curentpage=response.metadata.currentPage
          this.total=response.results
        }
      })
    }
}
