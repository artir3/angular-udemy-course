import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthGuard } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    ShoppingListComponent,
    ShoppingEditComponent,
    AuthComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule
  ],
  providers: [
    ShoppingListService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent
  ]
})
export class AppModule { }
