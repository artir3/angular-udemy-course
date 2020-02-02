import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<fromApp.AppState>) { }
  private tokenExpirationTimeout: any;

  setLogoutTimmer(expirationDuration: number) {
    this.tokenExpirationTimeout = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimmer() {
    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
      this.tokenExpirationTimeout = null;
    }
  }

}
