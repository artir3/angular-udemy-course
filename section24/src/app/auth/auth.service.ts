import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { AuthResponseData } from './auth-response-data.model';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<fromApp.AppState>) { }
  private tokenExpirationTimeout: any;

  setLogoutTimmer(expirationDuration: number) {
    this.tokenExpirationTimeout = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimmer() {
    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
      this.tokenExpirationTimeout = null;
    }
  }

}
