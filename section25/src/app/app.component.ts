import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { LoggingService } from './logging.service';
import * as formApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<formApp.AppState>, 
    private logger: LoggingService,
    @Inject(PLATFORM_ID) private platformId) { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    this.logger.message('Here AppComponent ngOnInit');
  }
}
