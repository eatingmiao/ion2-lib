import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { CoreStore } from '../core.store';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private store: CoreStore) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: this.resetUrl(request.url),
      headers: this.store.headers
    });

    return next.handle(request)
      .timeout(this.store.time)
        .catch(error => {
          throw this.handleError(error);
      });
  }

  private resetUrl(url: string): string {
    if(url.indexOf('json') === -1) {
      if(url == 'token') {
        url = `${this.store.server.identity}${this.store.api[url]}`;
      } else {
        url = `${this.store.server.app}${this.store.api[url]}`;
      }
    }
    return url;
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if(error.status) {
      return Observable.throw(error.status);
    } else {
      return Observable.throw('timeout');
    }
  }
}