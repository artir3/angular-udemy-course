import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

import { Ingredients } from '../shared/models/ingredients.model';
import * as fromApp from '../store/app.reducer';
import * as SPActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<Ingredients>;
  // private igChangedSub: Subscription;

  constructor(
    private logger: LoggingService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangedSub = this.shoppingListService.ingredientsChanged.subscribe((i: Ingredient[]) => {
    //   this.ingredients = i;
    // })
  }

  ngOnDestroy(): void {
    // this.igChangedSub.unsubscribe();
  }

  onEditItem(id: number) {
    this.store.dispatch(new SPActions.StartEdit(id))
        // this.shoppingListService.startedEditing.next(id);
  }
}
