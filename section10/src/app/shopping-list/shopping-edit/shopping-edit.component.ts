import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) nameInput: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInput: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }
  onAddItem() {
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;
    if (name && amount){
      const newIngredient = new Ingredient(name, amount);
      this.shoppingListService.addIngredient(newIngredient);
    }
  }

  onDeleteItem() {
    
  }

  onClearItem() {
    
  }
}
