import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slform: NgForm;
  // @ViewChild('nameInput') nameInputRef : ElementRef;
  // @ViewChild('amountInput') amountInputRef : ElementRef;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private sl: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.sl.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.sl.getIngredient(index);
        this.slform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

onAddItem(form: NgForm) {
  // const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
  const value = form.value;
  const newIngredient = new Ingredient(value.name, value.amount);
  // this.ingredientAdded.emit(newIngredient);
  if(this.editMode) {
    this.sl.updateIngredient(this.editedItemIndex, newIngredient);
  }
  else {
    this.sl.addIngredient(newIngredient);
  }
  this.editMode = false;
  form.reset();
  
}

onDelete() {
  this.sl.deleteIngredient(this.editedItemIndex);
  this.onClear();
}

onClear() {
  this.slform.reset();
  this.editMode = false;
}

ngOnDestroy() {

  this.subscription.unsubscribe();
}


}
