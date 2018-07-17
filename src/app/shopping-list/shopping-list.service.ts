import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService {

    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    ingredients: Ingredient[] = [new Ingredient('Besan',20), new Ingredient('Mustard Seeds',10)];
    
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient : Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addI(ingredients : Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}