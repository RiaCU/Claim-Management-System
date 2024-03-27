import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.css']
})
export class ListTemplateComponent {
  template: any=[];
  service:any=[];

  constructor(private services: ServicesService){
    this.services.getServices()
      .subscribe({
       next:(u)=>{
         this.service = u;
         //console.log(this.service);
       }
      }) ;
  }

  ngOnInit(): void {
    
          this.services.getTemplate()
          .subscribe({
            next:(t) => {
              this.template =t;
             //console.log(this.template);
              
            },
            error :(response) => {
              console.log(response);
            }
          });
        }
    
}
