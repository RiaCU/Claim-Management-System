import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../Models/admin.model';
import { Claim } from '../Models/claim.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {

  private baseApiUrl: string = "https://localhost:7269";
  constructor(private http: HttpClient) { }

  flag:boolean= false;


  isLoggedIn():boolean{
    return !!localStorage.getItem('Token');
  }

  login(user:Admin){
    return this.http.post(this.baseApiUrl+'/api/Admin/v1/login',user,{responseType:'text'});
  }

  registration(admin: Admin):Observable<Admin>{
    return this.http.post<Admin>(this.baseApiUrl+'/api/Admin/v1',admin);
  }

  claimSave(claim: Claim):Observable<Claim>{
    return this.http.post<Claim>(this.baseApiUrl+'/api/Claim/v1/saveClaim',claim);
  }

  updateClaim(claim: Claim):Observable<Claim>{
    return this.http.put<Claim>(this.baseApiUrl+'/api/Claim/v1/updateClaim?id='+claim.id,claim);
  }

  getAllClaim():Observable<any>{
    return this.http.get<any>(this.baseApiUrl+'/api/Claim/v1/getClaims');
  }

  getClaimByGmail(gmail : string):Observable<any>{
    return this.http.get<any>(this.baseApiUrl+'/api/Claim/v1/getClaim?email='+ gmail);
  }

  getClaimById(id : Number):Observable<any>{
    //console.log('test');
    return this.http.get<any>(this.baseApiUrl+'/api/Claim/v1/getClaimById?claimId='+ id);
  }

  getCatagory(){
    //console.log('test');
    return this.http.get(this.baseApiUrl+'/api/Catagory/v1/getCatagory');
  }

  getHospital():Observable<any>{
    return this.http.get<any>(this.baseApiUrl+'/api/Hospital/getHospital');
  }

  getServices():Observable<any>{
    //console.log('test');
    return this.http.get<any>(this.baseApiUrl+'/api/Service/v1/getService');
  }

  postService(service:any):Observable<any>{
    return this.http.post<any>(this.baseApiUrl+'/api/Service/v1/saveService',service);
  }

  getTemplate():Observable<any>{
    //console.log('test');
    return this.http.get<any>(this.baseApiUrl+'/api/Template/v1/getTemplate');
  }
  
  postTemplate(template:any):Observable<any>{
    return this.http.post<any>(this.baseApiUrl+'/api/Template/v1/saveTemplate',template);
  }

  setToken(token:string){
    localStorage.setItem('Token',token);
  }

  getToken(){
    return localStorage.getItem('Token');
  }

  sendLink(email: string):Observable<string>{
    return  this.http.post<any>(this.baseApiUrl+'/api/Admin/v1/sendLink?email='+email,email);
  }

  resetPassword(model: any):Observable<any>{
    //console.log(model)
    return this.http.post<any>(this.baseApiUrl+'/api/Admin/v1/resetPassword',model);
  }
  
}
