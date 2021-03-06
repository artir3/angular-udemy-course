import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
// Quick fix to restore ability to download files from db.
//        if (user) 
//          const modifiedReq = req.clone({
//            params: new HttpParams().set('auth', user.token)
//          })
//          return next.handle(modifiedReq);
//        }
        return next.handle(req);
      }));
  }
}
