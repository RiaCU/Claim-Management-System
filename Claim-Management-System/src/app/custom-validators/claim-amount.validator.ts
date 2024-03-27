import { inject } from '@angular/core';
import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
  } from '@angular/forms';
import { ServicesService } from '../services/services.service';

  
  export const claimAmountValidator: ValidatorFn = (control: AbstractControl,service:ServicesService): ValidationErrors | null => {
    const TemplateId = control.get('tName');
    const ClaimAmount =1000 //control.get('claimAmount')
    var template =[];
    service.getTemplate().subscribe({
        next:(u)=>{
          template = u;
          //console.log(this.template);
          while(template.templateId!=TemplateId)
          {
            
            template.templateId++;
          }
          const amount = template.claimAmount;
          if(amount < ClaimAmount) return null
          
        }
       }) ;
       return ClaimAmount.value === ClaimAmount.valueOf;
      ? null
      : { PasswordMisMatch: true };
       
    return null;
   /* if(!password || !confirmPassword)
        return null;

    return password.value === confirmPassword.value
      ? null
      : { PasswordMisMatch: true };*/
  };