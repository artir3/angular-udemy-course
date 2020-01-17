import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../shared/database.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
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
    this.authService.logout();
  }
}
