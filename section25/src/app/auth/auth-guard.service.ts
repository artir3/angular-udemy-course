import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import * as formApp from '../store/app.reducer';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private routere: Router,
        private store: Store<formApp.AppState>
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => authState.user),
            map(user => {
                // return !!user;
                const isAuth = !!user;
                if (isAuth) return true;
                return this.routere.createUrlTree(['/auth']);
            }));
    }
}
