import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServicesService } from './services.service';

export const authGuard: CanActivateFn = (route, state) => {
  const oauthService: ServicesService = inject(ServicesService);
  if(oauthService.isLoggedIn())
    return true;
  else
  {
    alert('Wrong Credential!')
    inject(Router).navigateByUrl('login');
    return false;
  }
  
};
