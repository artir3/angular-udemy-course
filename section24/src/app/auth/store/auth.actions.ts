import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAILED = '[Auth] Authenticate Failed'
export const CLEAR_ERROR = '[Auth] Clear Error'

export const SIGNUP_START = '[Auth] Signup Start'

export const LOGIN_START = '[Auth] Login Start'
export const AUTO_LOGIN = '[Auth] Auto Login'

export const LOGOUT = '[Auth] Logout'

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

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions =
    | Logout
    | LoginStart
    | SignupStart
    | AuthenticateSuccess
    | AuthenticateFailed
    | ClearError
    | AutoLogin
    ;

