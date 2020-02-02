import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ShoppingListStore } from 'src/app/shared/models/shopping-list.store.model';
import * as SPActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('form', {static: true}) ngForm: NgForm;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<ShoppingListStore>
    ) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index)=> {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.ngForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.onReset()
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new SPActions.AddIngredient(newIngredient))
    }
    form.reset();
    this.onReset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onReset();
  }
  
  onReset() {
    this.editMode = false;
    this.editedItem = null;
    this.editedItemIndex = null;
    this.ngForm.reset()
  }
}
