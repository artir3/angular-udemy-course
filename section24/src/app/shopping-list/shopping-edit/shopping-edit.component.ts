import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SPActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  @ViewChild('form', { static: true }) ngForm: NgForm;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.ngForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      else this.editMode = false;
    })
    // this.subscription = this.shoppingListService.startedEditing
    //   .subscribe((index) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.shoppingListService.getIngredient(index);
    //     this.ngForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     })
    //   })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.onReset()
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new SPActions.UpdateIngredients(newIngredient))
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new SPActions.AddIngredient(newIngredient))
    }
    form.reset();
    this.onReset();
  }

  onDelete() {
    this.store.dispatch(new SPActions.DeleteIngredients())
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onReset();
  }

  onReset() {
    this.editMode = false;
    this.editedItem = null;
    this.ngForm.reset()
    this.store.dispatch(new SPActions.StopEdit());
  }
}
