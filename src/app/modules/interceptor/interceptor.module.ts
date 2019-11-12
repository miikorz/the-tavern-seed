import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  loadingStateBlocked = false;
  constructor(private redux: NgRedux<any>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.redux.getState().login.token;
    if (token) {
      req = req.clone({
        setHeaders: { 'Authorization': token }
      });
    }

    return next.handle(req).pipe(tap(
      (event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // RESPONSE OK DE TODO
      }},
      (error: any) => {
        // ERROR RESPONSE
      }));

  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
  }],
  declarations: []
})

export class InterceptorModule {}
