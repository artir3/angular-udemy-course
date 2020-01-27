import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from '../auth-response-data.model';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error = null;
  @ViewChild(PlaceholderDirective, {static: true}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit() {
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

      let authObs: Observable<AuthResponseData>;

      if (this.isLoginMode) {
        authObs = this.authService.login(email, password)
      } else {
        authObs = this.authService.signUp(email, password)
      }

      authObs.subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMeessage => {
        this.error = errorMeessage;
        this.showErrorAlert(errorMeessage);
        this.isLoading = false;
      });

      form.reset();
    } else return;
  }

  onHideError() {
    this.error = null;
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
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
