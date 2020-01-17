import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { AuthResponseData } from './auth-response-data.model';
import { User } from './user.model';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient, private router: Router) { }
  user = new BehaviorSubject<User>(null);

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
      tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth'])
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
    this.user.next(user);
  }
}
