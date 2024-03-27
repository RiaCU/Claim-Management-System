import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-add-templete-service',
  templateUrl: './add-templete-service.component.html',
  styleUrls: ['./add-templete-service.component.css']
})
export class AddTempleteServiceComponent {
  service : any;
  template : any;
  catagory : any = [];
  ser : any = [];

  constructor(private services:ServicesService,private router : Router){
    this.service={
      Id : '',
      ServiceName : '',
      CatagoryId:''
    };

    this.template={
      Id:'',
      ServiceId:'',
      AmmountAllocated:''
    };
  }

  ngOnInit(): void {
    this.services.getCatagory()
    .subscribe({
     next:(u)=>{
       this.catagory = u;
       //console.log(this.catagory);
     }
    }) ;

    this.services.getServices()
    .subscribe({
     next:(u)=>{
       this.ser = u;
       //console.log(this.ser);
     }
    }) ;
    
  }


  serviceForm= new FormGroup({
    sname:new FormControl(""),
    cId:new FormControl("")
  });

  get ServiceName(): FormControl{
    return this.serviceForm.get("sname") as FormControl;
  }
  get CatagoryId(): FormControl{
    return this.serviceForm.get("cId") as FormControl;
  }

  templateForm= new FormGroup({
    serviceId:new FormControl(""),
    amt:new FormControl("")   
  });

  get ServiceId(): FormControl{
    return this.templateForm.get("serviceId") as FormControl;
  }
  get AmmountAllocated(): FormControl{
    return this.templateForm.get("amt") as FormControl;
  }
  
  addService(){
    console.log(this.service);
    this.services.postService(this.service)
    .subscribe({
      next: (u)=>{
        //console.log(u);
        if(u==null)
        {
          alert("Failed!");
        }
				else
        {
          alert("Successfully Add service");
          this.service=[];
          //this.router.navigateByUrl('admin/addtempandservice');
          //console.log(u);
          
        } 
      }
    });
  }

  addTemplate(){
    this.services.postTemplate(this.template)
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
          alert("Successfully Add Template");
          this.template=[];
          //this.router.navigateByUrl('admin/addtempandservice');
          //console.log(u);
        }
        
      }
  
    });
  }

  viewClaims(){
    this.router.navigateByUrl('admin/claims');
  }

  viewTemplate(){
    this.router.navigateByUrl('admin/template');
  }


}
