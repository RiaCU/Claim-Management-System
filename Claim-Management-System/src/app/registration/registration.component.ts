import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regObj: any;
  constructor(private fb:FormBuilder,private router: Router,private services: ServicesService){
    this.regObj=
    {
      Id:'',
      Name:'',
      Email:'',
      Password:''
    }
  }
  

  ngOnInit():void{}

  registerForm= new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
    email : new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}')]),
    role : new FormControl("",[Validators.required]),
  });

  get Name(): FormControl{
    return this.registerForm.get("name") as FormControl;
  }
  get Email(): FormControl{
    return this.registerForm.get("email") as FormControl;
  }
  get Password(): FormControl{
    return this.registerForm.get("password") as FormControl;
  }
  get Role(): FormControl{
    return this.registerForm.get("role") as FormControl;
  }


  registerSubmitted(){
    //console.log(this.registerForm);
    this.services.registration(this.regObj)
    .subscribe({
      next: (u)=>{
        console.log(u);
        //alert("Successfully Registered");
        if(u==null)
        {
          alert("Invalid UserId and password");
        }
				else
        {
          alert("Successfully Registered");
          this.router.navigateByUrl('');
        }
        
      }
  
    });
  }
}

