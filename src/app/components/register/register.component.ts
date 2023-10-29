import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormGroup,FormControl,Validators,FormControlOptions, FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  errMsg: string = ''; // '' -===>false    |   'dsdsdf' ===>true
  isLoading: boolean = false;

registerForm:FormGroup=new FormGroup({
name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
email: new FormControl('',[Validators.required,Validators.email]),
password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-z0-9_@]{6,}$/)]),
rePassword:new FormControl(''),
phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
},{ validators: [this.confirmPassword] } as FormControlOptions)



confirmPassword(group: FormGroup): void {
  const password = group.get('password');
  const rePassword = group.get('rePassword');

  if (rePassword?.value == '') {
    rePassword?.setErrors({ required: true });
  } else if (password?.value != rePassword?.value) {
    rePassword?.setErrors({ mismatch: true });
  }
}




handleForm(): void {
  const userData = this.registerForm.value;
  this.isLoading = true;

  if (this.registerForm.valid === true) {
    this._AuthService.register(userData).subscribe({
      next: (response) => {
        //tmam

        if (response.message == 'success') {
          this.isLoading = false;
          this._Router.navigate(['/login']);
        }
      },
      error: (err) => {
        // msh tmam
        console.log(err);
        this.errMsg = err.error.message;
        this.isLoading = false;
      },
    });
  }
}
}
