import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<AuthResponseData>(
      environment.signUpUrl,
      { email: email, password: password, returnSecureToken: true },
      newHeaders
    );

  }
}
