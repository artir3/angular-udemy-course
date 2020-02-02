import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAILED = '[Auth] Authenticate Failed'
export const LOGOUT = '[Auth] Logout'
export const LOGIN_START = '[Auth] Login Start'
export const SIGNUP_START = '[Auth] Signup Start'

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: User) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class AuthenticateFailed implements Action {
    readonly type = AUTHENTICATE_FAILED;
    constructor(public payload: string) { }
}

export type AuthActions =
    Logout |
    LoginStart |
    SignupStart |
    AuthenticateSuccess |
    AuthenticateFailed 
    ;

