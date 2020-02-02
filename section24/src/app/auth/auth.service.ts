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

class SignModel {
  returnSecureToken: true
  constructor(public email: string, public password: string) { }
}

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimeout: any;

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationData: Date
    } = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData._token) {
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationData)
        )
        // this.user.next(loadedUser);
        this.store.dispatch(new AuthActions.AuthenticateSuccess(loadedUser));
        const expirationDuration = new Date(userData._tokenExpirationData).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);

      }
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout)
    }
    this.tokenExpirationTimeout = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimeout = setTimeout(() => {
      this.logout();
    }, expirationDuration);

  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn + 1000);
    const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);
    this.store.dispatch(new AuthActions.AuthenticateSuccess(user));
    this.autoLogout(expiresIn + 1000)
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
