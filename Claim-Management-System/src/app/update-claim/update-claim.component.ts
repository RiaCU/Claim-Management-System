import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';


@Component({
  selector: 'app-update-claim',
  templateUrl: './update-claim.component.html',
  styleUrls: ['./update-claim.component.css']
})
export class UpdateClaimComponent {
  claim : any;
  today: string = new Date().toISOString().split('T')[0];
  hospital : any =[];
  template : any =[];
  service : any = [];
  constructor(private router:Router,private services:ServicesService,private route : ActivatedRoute){
    this.claim={
      Id:'',
      ClaimId:0,
      FirstName:'',
      MiddleName:'',
      LastName:'',
      Age: 0,
      Gender:'',
      DOB:'',
      ServiceId:'',
      ClaimAmount:0,
      EmailId:'',
      TemplateId:0,
      HospitalId:'',
      City:'',
      State:'',
      Address:'',
      
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) =>{
        //console.log(params);
        const claimId = params.get('id');
        //console.log(claimId);
        if(claimId)
        {
          this.services.getClaimById(Number(claimId))
          .subscribe({
            next: (c)=>{
              this.claim = c;
              //console.log(this.claim);
            }
          });
        }
      }
    });

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
    fname:new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
    lname:new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
    address:new FormControl("",[Validators.required,Validators.maxLength(100)]),
    state:new FormControl("",[Validators.required]),
    city:new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required,Validators.email]),
    sName: new FormControl("",[Validators.required]),
    hName: new FormControl("",[Validators.required]),
    tName: new FormControl("",[Validators.required]),
    dob: new FormControl("",[Validators.required]),
    gender:new FormControl("",[Validators.required]),
    age:new FormControl(""),
    cAmount:new FormControl("")
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
  get Age(): FormControl{
    return this.claimForm.get("age") as FormControl;
  }
  get ClaimAmount(): FormControl{
    return this.claimForm.get("cAmount") as FormControl;
  }
   
  

  updateClaim()
  {
    //console.log(this.claim);
    this.services.updateClaim(this.claim)
  .subscribe({
    next: (u)=>{
      //console.log(u);
      //alert("Successfully Registered");
      if(u==null)
      {
        alert("Failed!");
      }
      else
      {
        alert("Successfully Claimed");
        //console.log(u);
        //this.router.navigateByUrl('claim/'+u.id);
        this.router.navigateByUrl('claim/search/'+u.emailId);
      }
      
    }

  });
  }

  close(){
    this.router.navigateByUrl("");
  }

  
}
