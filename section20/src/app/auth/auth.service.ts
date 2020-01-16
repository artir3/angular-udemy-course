import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

class SignModel {
  returnSecureToken: true
  constructor(public email: string, public password: string) {}
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

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      environment.signInUrl,
      new SignModel(email, password),
      headers
      )
  }
}
