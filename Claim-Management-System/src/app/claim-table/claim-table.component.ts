import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-claim-table',
  templateUrl: './claim-table.component.html',
  styleUrls: ['./claim-table.component.css']
})
export class ClaimTableComponent {
  claims: any=[];

  constructor(private service: ServicesService,private route : ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) =>{
        const email = params.get('email');
        //console.log(email);
        if(email)
        {
          this.service.getClaimByGmail(email)
          .subscribe({
            next:(c) => {
              this.claims =c;
             //console.log(this.claims);
              
            },
            error :(response) => {
              console.log(response);
            }
          });
        }
      }
    });
  }
}
