import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotpassService } from 'src/app/core/services/forgotpass.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  constructor(private _ForgotpassService:ForgotpassService,private toastr: ToastrService ,private _Router:Router){}
step1:boolean=true
step2:boolean=false
step3:boolean=false
email:string=''
Resetcode:any=''
newPass:any=''

forgetForm:FormGroup=new FormGroup({
  email:new FormControl('')
})

resetCodeForm:FormGroup=new FormGroup({
  resetCode:new FormControl('')
})

resetPasword:FormGroup=new FormGroup({

  newPassword:new FormControl('')
})


forgotpassword(){
  let userEmail=this.forgetForm.value
  this.email=userEmail.email

this._ForgotpassService.forgotpassword(userEmail).subscribe({
  next:(response)=>{
  console.log(response)
this.toastr.success(response.message);
    this.step1=false
    this.step2=true
  },error:(err)=>{
this.toastr.warning(err.error.message);

  }
})
}

resetCode(){
  let Resetcode=this.resetCodeForm.value;

  this._ForgotpassService. resetCode(Resetcode).subscribe({
    next:(response)=>{
    console.log(response)
  this.toastr.success(response.status);
      this.step1=false
      this.step2=false
      this.step3=true
    },error:(err)=>{
  this.toastr.warning(err.error.message);
  
    }
  })

}



newPassword(){

let resetForm=this.resetPasword.value;
resetForm.email=this.email

  this._ForgotpassService. newPassword(resetForm).subscribe({
    next:(response)=>{
    console.log(response)
  this.toastr.success("SUCCESS");
      this.step1=true
      this.step2=false
      this.step3=false
      this.email=''
      this._Router.navigate(['/login']);
      
    },error:(err)=>{
  this.toastr.warning(err.error.message);
  
    }
  })


}
}
