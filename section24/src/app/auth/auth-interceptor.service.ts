import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as formApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService, 
    private store: Store<formApp.AppState>
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        // there is a problem woth login so i disable authentication on database to end of this course
        // if (user) {
        //   const modifiedReq = req.clone({
        //     params: new HttpParams().set('auth', user.token)
        //   })
        //   return next.handle(modifiedReq);
        // }
        return next.handle(req);
      }));
  }
}