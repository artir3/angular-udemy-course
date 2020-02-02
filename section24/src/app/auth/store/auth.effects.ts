import { Actions, ofType, Effect } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponseData } from '../auth-response-data.model';
import { of } from 'rxjs';
import { User } from '../user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
                    return new AuthActions.Login(user);
                }),
                catchError(error => {
                    const handleError = this.handleError(error)
                    return of(new AuthActions.LoginFailed(handleError));
                }),
            )
        }),
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/'])
        })
    )

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) { }

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
        return errorMessage;
    }
}