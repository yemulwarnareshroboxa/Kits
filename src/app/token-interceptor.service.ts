import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  tokenizedReq: any;
  public role: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router
    ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    this.role = sessionStorage.getItem('role');
    if (this.role === null) {
    //  alert('k')
    //  this.tokenizedReq = req.clone({
       
    //   setHeaders: {
        
    //     Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
    //     // Access-Control-Allow-Origin: '*'
    //   }
    // });


      const tokenizedReq = req.clone({
       
        setHeaders : {
        Authorization : 'Bearer '
        }
      });
      return next.handle(tokenizedReq)
        .pipe(
          tap((res) => {
            if (res instanceof HttpResponse && res.status === 200) {
            }
          }),
          catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 500 || err.status === 504 || err.status === 404) {
              } else if (err.status === 401) {
           
              } else if (err.status === 200) {
              } else if (err.status === 0) {
              }
            }

            return throwError(err);
          }),
          finalize(() => {
          }),
        );
    }
    else {

  
      this.tokenizedReq = req.clone({
       
        setHeaders: {
          
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
          // Access-Control-Allow-Origin: '*'
        }
      });

      return next.handle(this.tokenizedReq)
        .pipe(
          tap((res) => {
            if (res instanceof HttpResponse && res.status === 200) {
            }
          }),
          catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 500 || err.status === 504) {

              } else if (err.status === 404) {
                // this.router.navigate(['/pagenotfound']);
              } else if (err.status === 401) {

              
              }
              else if (err.status === 200) {
             
              } else if (err.status === 0) {
               
              }
            }
         
            return of(err);
          }),
          finalize(() => {
          }),
        );

    }


  }

}