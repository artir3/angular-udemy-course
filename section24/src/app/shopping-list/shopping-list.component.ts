import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import { ShoppingListStore } from '../shared/models/shopping-list.store.model';
import { Ingredients } from '../shared/models/ingredients.model';

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
    private shoppingListService: ShoppingListService,
    private store: Store<ShoppingListStore>) { }

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
    this.shoppingListService.startedEditing.next(id);
  }
}
