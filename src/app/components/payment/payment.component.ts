import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  cartId:any=""
  constructor(private _ActivatedRoute:ActivatedRoute ,private _CartService:CartService){}

  orderForm:FormGroup=new FormGroup({
    details:new FormControl(''),
    phone:new FormControl(''),
    city:new FormControl(''),
  })
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
     this.cartId= params.get('id')
    }
  })
}

handelForm(){
  this._CartService.checkOut(this.cartId,this.orderForm.value).subscribe({
    next:(response)=>{
      if(response.status=="success"){
        window.open(response.session.url,'_self')
      }
    }
  })
}


}
