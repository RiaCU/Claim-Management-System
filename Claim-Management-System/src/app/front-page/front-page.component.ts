import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent {
  loginObj : any;
  emailId: any='';
  
  constructor(private router: Router,private services: ServicesService) { 
    this.loginObj={
      Id:'',
      Email:'',
      Password:'',
      Role:''
    };

    
  }

  loginForm= new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    psw: new FormControl("",[Validators.required]),
    rol: new FormControl("",[Validators.required])
  });

  get Email(): FormControl{
    return this.loginForm.get("email") as FormControl;
  }
  get Password(): FormControl{
    return this.loginForm.get("psw") as FormControl;
  }
  get Role(): FormControl{
    return this.loginForm.get("rol") as FormControl;
  }

  emailForm= new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email])
  });

  get EmailId(): FormControl{
    return this.emailForm.get("email") as FormControl;
  }

  login()
  {
    
    this.services.login(this.loginObj)
    .subscribe({
      next: (u)=>{
        //console.log(u);
        //alert("Successfully logged in");
        if(u==null)
        {
          alert("Invalid User and password");
        }
				else
        {
          alert("Successfully logged in");
          this.services.flag=true;
          this.services.setToken(u);
          this.router.navigateByUrl('admin/addtempandservice');
        }
      }
    });
  }

  send()
  {
    
    
    document.getElementById("closeBtn")?.click();
    this.services.sendLink(this.emailId).
    subscribe({
      next:(res)=>{
        alert("Email Sent!");
        },
      error:(err)=>{
        alert("Something went Wrong");
      }
    })
    this.emailId='';
  }
}


