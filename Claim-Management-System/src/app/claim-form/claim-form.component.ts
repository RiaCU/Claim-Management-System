import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';


@Component({
  selector: 'app-claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.css']
})

export class ClaimFormComponent {
  claim : any;
  today: string = new Date().toISOString().split('T')[0];
  hospital : any =[];
  template : any =[];
  service : any = [];

  constructor(private router:Router,private services:ServicesService){
    this.claim={
      Id:'',
      FirstName:'',
      MiddleName:'',
      LastName:'',
      Age: 0,
      Gender:'',
      DOB:'',
      ServiceId:'',
      ClaimAmount:0,
      EmailId:'',
      TemplateId:'',
      HospitalId:'',
      City:'',
      State:'',
      Address:'',
      
    };
  }
  ngOnInit(): void {
      this.services.getHospital()
      .subscribe({
       next:(u)=>{
         this.hospital = u;
         //console.log(this.hospital);
       }
      }) ;

      this.services.getServices()
      .subscribe({
       next:(u)=>{
         this.service = u;
         //console.log(this.service);
       }
      }) ;

      this.services.getTemplate()
      .subscribe({
       next:(u)=>{
         this.template = u;
         //console.log(this.template);
       }
      }) ;
    }
    
    

    claimForm= new FormGroup({
      fname:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      lname:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      address:new FormControl("",[Validators.required,Validators.maxLength(100)]),
      state:new FormControl("",[Validators.required]),
      city:new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.email]),
      sName: new FormControl("",[Validators.required]),
      hName: new FormControl("",[Validators.required]),
      tName: new FormControl("",[Validators.required]),
      dob: new FormControl("",[Validators.required]),
      gender:new FormControl("",[Validators.required]),
    });
  
    get FirstName(): FormControl{
      return this.claimForm.get("fname") as FormControl;
    }
    get LastName(): FormControl{
      return this.claimForm.get("lname") as FormControl;
    }
    get Address(): FormControl{
      return this.claimForm.get("address") as FormControl;
    }
    get State(): FormControl{
      return this.claimForm.get("state") as FormControl;
    }
    get City(): FormControl{
      return this.claimForm.get("city") as FormControl;
    }
    get EmailId(): FormControl{
      return this.claimForm.get("email") as FormControl;
    }
    get ServiceId(): FormControl{
      return this.claimForm.get("sName") as FormControl;
    }
    get HospitalId(): FormControl{
      return this.claimForm.get("hName") as FormControl;
    }
    get TemplateId(): FormControl{
      return this.claimForm.get("tName") as FormControl;
    }
    get DOB(): FormControl{
      return this.claimForm.get("dob") as FormControl;
    }
    get Gender(): FormControl{
      return this.claimForm.get("gender") as FormControl;
    }
    
     
    

    claimSubmitted()
    {
      //console.log(this.claim);
      this.services.claimSave(this.claim)
    .subscribe({
      next: (u)=>{
        if(u==null)
        {
          alert("Failed!");
        }
				else
        {
          alert("Successfully Claimed!\n \nYour claim id is "+ u.claimId);
          //console.log(u);
          //this.router.navigateByUrl('claim/'+u.id);
          this.router.navigateByUrl('claim');
        }
        
      }
  
    });
    }


}


