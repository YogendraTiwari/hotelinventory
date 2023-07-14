import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const headers = new HttpHeaders({ token: '13131k3b1jh3b1jh3b1jh23' });
    // const newRequest = request.clone({ headers: headers });
    // console.log('Request from interceptor', newRequest);
    return next.handle(request);
  }
}
