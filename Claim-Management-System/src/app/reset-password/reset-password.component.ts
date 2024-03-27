import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from '../custom-validators/confirm-password.validator';
import { ServicesService } from '../services/services.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  emailModel:any;
  

  constructor(private services: ServicesService,private route : ActivatedRoute,private router: Router){
    this.emailModel={
      Email:'',
      EmailToken:'',
      Password:''
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next:(params) =>{
        this.emailModel.Email = params['email'];
        this.emailModel.EmailToken = params['code'];
      }
    });
  }


  resetForm= new FormGroup({
    password: new FormControl("",[Validators.required]),
    confirmPassword:new FormControl("",[Validators.required]),
    },
    {
      validators:confirmPasswordValidator
    });

  get Password(): FormControl{
    return this.resetForm.get("password") as FormControl;
  }
  get ConfirmPassword(): FormControl{
    return this.resetForm.get("confirmPassword") as FormControl;
  }
   
  

  resetPassword()
  {
    this.emailModel.EmailToken = this.emailModel.EmailToken.replace(/ /g,'+');
    
    this.services.resetPassword(this.emailModel).subscribe({
      next: (u)=>{
        //console.log(u);
        alert("Successfully Reset Password!");
        this.router.navigateByUrl('login');
      },
				error:(err)=>{
          //console.log(err)
          alert("Something went Wrong");
          this.router.navigateByUrl('login');
        }
        
      
    });
  }


}
