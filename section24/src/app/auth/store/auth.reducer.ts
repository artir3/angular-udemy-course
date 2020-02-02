import { User } from "../user.model";
import * as fromAuthActions from "./auth.actions";

export interface State {
    user: User;
}

const initialState = {
    user: null
}

export function authReducer(state = initialState, action: fromAuthActions.AuthActions) {
    switch (action.type) {
        case fromAuthActions.LOGIN:
            return { ...state, user: action.payload }
        case fromAuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}
