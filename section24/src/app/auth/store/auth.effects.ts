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
import { AuthService } from '../auth.service';

class SignModel {
    returnSecureToken: true
    constructor(public email: string, public password: string) { }
};

const headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const handleAuthentication = (resData: AuthResponseData) => {
    const expiresIn = resData.expiresIn ? +resData.expiresIn : 3600;
    const expirationDate = new Date(new Date().getTime() + expiresIn + 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess(user, true);
}

const handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occured!'
    if (error.error && error.error.error) {
        switch (error.error.error.message) {
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
    return of(new AuthActions.AuthenticateFailed(errorMessage));
}

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
    ) { }

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                environment.signUpUrl,
                new SignModel(signupAction.payload.email, signupAction.payload.password),
                headers
            ).pipe(
                tap(resData => this.setTimeout(resData)),
                map(resData => handleAuthentication(resData)),
                catchError(error => handleError(error)),
            )
        })
    );


    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authDate: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                environment.signInUrl,
                new SignModel(authDate.payload.email, authDate.payload.password),
                headers
            ).pipe(
                tap(resData => this.setTimeout(resData)),
                map(resData => handleAuthentication(resData)),
                catchError(error => handleError(error)),
            )
        }),
    );

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimmer();
            localStorage.clear();//removeItem('userData');
            this.router.navigate(['/auth']);
        })
    )

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            if (authSuccessAction.redirect) {
                this.router.navigate(['/']);
            }
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
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
                    userData._tokenExpirationData
                )
                const expirationDuration = new Date(userData._tokenExpirationData).getTime() - new Date().getTime();
                this.authService.setLogoutTimmer(expirationDuration);
                return new AuthActions.AuthenticateSuccess(loadedUser, false);
            }
            return { type: 'DUMMY' }
        })
    )

    private setTimeout(resData: AuthResponseData) {
        const expiresIn = resData.expiresIn ? +resData.expiresIn : 3600;
        this.authService.setLogoutTimmer(expiresIn * 1000);
    }
}