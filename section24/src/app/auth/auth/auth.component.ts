import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from '../auth-response-data.model';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error = null;
  @ViewChild(PlaceholderDirective, { static: true }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(
      authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error)
        }
      }
    );
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.onHideError();

      const email = form.value.email;
      const password = form.value.password;
      const user = { email: email, password: password };
      if (this.isLoginMode) {
        this.store.dispatch(new AuthActions.LoginStart(user))
      } else {
        this.store.dispatch(new AuthActions.SignupStart(user))
      }

      form.reset();
    } else return;
  }

  onHideError() {
    this.error = null;
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent(); this is valid js object but it dont work in angular
    const alertComponentFactory = this.cfr.resolveComponentFactory(AlertComponent);
    const hvcr = this.alertHost.viewContainerRef;
    hvcr.clear();
    const cr = hvcr.createComponent(alertComponentFactory);

    cr.instance.message = message;
    this.closeSub = cr.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hvcr.clear();
    })
  }
}
