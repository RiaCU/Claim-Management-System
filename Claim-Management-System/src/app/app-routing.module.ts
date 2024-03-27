import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTempleteServiceComponent } from './add-templete-service/add-templete-service.component';
import { AllClaimsComponent } from './all-claims/all-claims.component';
import { ClaimFormComponent } from './claim-form/claim-form.component';
import { ClaimTableComponent } from './claim-table/claim-table.component';
import { DownloadClaimComponent } from './download-claim/download-claim.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ListTemplateComponent } from './list-template/list-template.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { authGuard } from './services/auth.guard';
import { UpdateClaimComponent } from './update-claim/update-claim.component';

const routes: Routes = [
  
  {path: '', component: ClaimFormComponent },
  {path: 'claim', component: ClaimFormComponent },
  {path: 'claim/download/:id', component: DownloadClaimComponent },
  {path: 'claim/:id', component: DownloadClaimComponent },
  {path:'claim/update/:id',component: UpdateClaimComponent},
  {path : 'claim/search/:email',component: ClaimTableComponent},
  {path: 'login', component: FrontPageComponent },
  {path:'registration', component:RegistrationComponent},
  {path:'admin/addtempandservice',component: AddTempleteServiceComponent,canActivate:[authGuard]},
  {path:'admin/template',component:ListTemplateComponent,canActivate:[authGuard]},
  {path:'admin/claims',component:AllClaimsComponent,canActivate:[authGuard]},
  {path:'reset',component:ResetPasswordComponent},
  { path: 'navbar', component : NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
