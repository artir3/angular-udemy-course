import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../shared/database.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import * as formApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['a { cursor:pointer; }']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAutenticated = false;

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService,
    private store: Store<formApp.AppState>
  ) { }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAutenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.databaseService.storeRecipes();
  }

  onFetechData() {
    this.databaseService.fetechRecipes().subscribe();;
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout())
  }
}
