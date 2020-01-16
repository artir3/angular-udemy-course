import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthResponseData } from './AuthResponseeData.model';

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
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      environment.signUpUrl,
      new SignModel(email, password),
      headers
    ).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      environment.signInUrl,
      new SignModel(email, password),
      headers
    ).pipe(catchError(this.handleError));
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
}
