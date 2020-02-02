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

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      environment.signUpUrl,
      new SignModel(email, password),
      headers
    ).pipe(
      catchError(this.handleError),
      tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      environment.signInUrl,
      new SignModel(email, password),
      headers
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        let expirationDate = resData.expiresIn ? +resData.expiresIn : 3600;
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, expirationDate)
      })
    );
  }

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
        this.store.dispatch(new AuthActions.Login(loadedUser));
        const expirationDuration = new Date(userData._tokenExpirationData).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);

      }
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout);
    this.router.navigate(['/auth'])
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

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!'
    if (errorResponse.error && errorResponse.error.error) {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS': {
          errorMessage = 'The email address is already in use by another account';
          break;
        }
        case 'OPERATION_NOT_ALLOWED': {
          errorMessage = 'Password sign-in is disabled for this project';
          break;
        }
        case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
        }
        case 'EMAIL_NOT_FOUND': {
          errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted';
          break;
        }
        case 'INVALID_PASSWORD': {
          errorMessage = 'The password is invalid or the user does not have a password';
          break;
        }
        case 'USER_DISABLED': {
          errorMessage = 'The user account has been disabled by an administrator';
          break;
        }
      }
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn + 1000);
    const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);
    this.store.dispatch(new AuthActions.Login(user));
    this.autoLogout(expiresIn + 1000)
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
