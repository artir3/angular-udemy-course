import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout'
export const LOGIN_START = '[Auth] Login Start'
export const LOGIN_FAILED= '[Auth] Login Failed'


export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: User) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class LoginFailed implements Action {
    readonly type = LOGIN_FAILED;
    constructor(public payload: string) { }
}

export type AuthActions = Login | Logout;

