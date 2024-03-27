import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-all-claims',
  templateUrl: './all-claims.component.html',
  styleUrls: ['./all-claims.component.css']
})
export class AllClaimsComponent {
  claims: any=[];

  constructor(private service: ServicesService){}

  ngOnInit(): void {
    
    this.service.getAllClaim()
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
