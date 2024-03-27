import { Component } from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-download-claim',
  templateUrl: './download-claim.component.html',
  styleUrls: ['./download-claim.component.css']
})
export class DownloadClaimComponent {

  updateClaim : any;

  constructor(private route: ActivatedRoute,private service: ServicesService,private router: Router){
    this.updateClaim={
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
      TemplateId:'',
      HospitalId:'',
      City:'',
      State:'',
      Address:'',
      
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) =>{
        
        const claimId = params.get('id');
        //console.log(claimId);
        if(claimId)
        {
          this.service.getClaimById(Number(claimId))
          .subscribe({
            next: (claim)=>{
              this.updateClaim = claim;
              //console.log(this.updateClaim);
            }
          });
        }
      }
    });
    }

    close(){
      this.router.navigateByUrl("");
    }

  generatePDF() {

    
    html2canvas(document.getElementById('claim')!).then((canvas) => {
  
      const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for paper size.
  
      const imgData = canvas.toDataURL('image/png');
  
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Adjust dimensions as needed.
  
      pdf.save(this.updateClaim.claimId+'.pdf'); // Save the PDF with a given name.
  
    });
  
  }

}
