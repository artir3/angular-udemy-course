import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AuthGuard } from './auth/auth-guard.service';
import { RecipeService } from './recipes/recipe.service';


@NgModule({
  providers: [
    AuthGuard,
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
