import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { ClaimFormComponent } from './claim-form/claim-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateClaimComponent } from './update-claim/update-claim.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DownloadClaimComponent } from './download-claim/download-claim.component';
import { AddTempleteServiceComponent } from './add-templete-service/add-templete-service.component';
import { ClaimTableComponent } from './claim-table/claim-table.component';
import { AllClaimsComponent } from './all-claims/all-claims.component';
import { ListTemplateComponent } from './list-template/list-template.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password.component';





@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    RegistrationComponent,
    ClaimFormComponent,
    NavbarComponent,
    UpdateClaimComponent,
    DownloadClaimComponent,
    AddTempleteServiceComponent,
    ClaimTableComponent,
    AllClaimsComponent,
    ListTemplateComponent,
    ResetPasswordComponent,
    
    
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
      ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
