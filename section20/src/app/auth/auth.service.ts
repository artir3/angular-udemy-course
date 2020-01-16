import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    let newHeaders = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<AuthResponseData>(
      environment.signUpUrl,
      { email: email, password: password, returnSecureToken: true },
      newHeaders
    ).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occured!'
      if (errorRes.error && errorRes.error.error) {
        switch (errorRes.error.error.message) {
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
        }
      }
      return throwError(errorMessage);
    }));

  }
}
