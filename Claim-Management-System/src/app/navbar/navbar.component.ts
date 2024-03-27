import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  email: any;
  

  constructor(private router: Router,public service: ServicesService){
    this.email='';
  }

  searchform= new FormGroup({
    eml: new FormControl(""),
  });

  get Email(): FormControl{
    return this.searchform.get("eml") as FormControl;
  }

  search(){
    //console.log(this.email);
        this.router.navigateByUrl('claim/search/'+this.email);
        this.email='';
      }
    
  
  

  logout()
  {
    this.service.flag=false;
    this.router.navigateByUrl('');
    localStorage.clear();
  }
}
