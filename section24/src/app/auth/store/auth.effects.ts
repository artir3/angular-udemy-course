import { Actions, ofType, Effect } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../auth-response-data.model';
import { of } from 'rxjs';
import { User } from '../user.model';
import { Injectable } from '@angular/core';

class SignModel {
    returnSecureToken: true
    constructor(public email: string, public password: string) { }
};

const headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authDate: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                environment.signInUrl,
                new SignModel(authDate.payload.email, authDate.payload.password),
                headers
            ).pipe(
                map((resData: AuthResponseData) => {
                    const expirationDate = new Date(new Date().getTime() + resData.expiresIn + 1000);
                    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
                    return of(new AuthActions.Login(user));
                }),
                catchError(error => {
                    return of();
                }),
            )
        }),
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }
}