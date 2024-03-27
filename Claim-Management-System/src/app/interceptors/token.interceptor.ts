import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private service : ServicesService,private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.service.getToken();

    if(myToken)
    {
      request = request.clone({
        setHeaders:{Authorization:'Bearer '+myToken}
      })
    }

    return next.handle(request).pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            alert("Wrong Credential! Please login");
            this.router.navigateByUrl("login");
          }
        }
        return throwError(()=>new Error("Something Wrong!"))
      })
    );
  }
}
