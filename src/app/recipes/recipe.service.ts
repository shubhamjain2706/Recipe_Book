import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { InternalNgModuleRef } from "@angular/core/src/linker/ng_module_factory";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]> ();

    // recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] =[
        new Recipe('Dhokla','Gujarati Dish','https://www.ndtv.com/cooks/images/dhokla%20%281%29%20%281%29.jpg',[new Ingredient('Rai',10),new Ingredient('Green Chillies',10)]),
        new Recipe('Pizza','Italian','https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/alpine_pizza_32132_16x9.jpg',[new Ingredient('Cheese',10),new Ingredient('Dough',10)])
      ];

    constructor(private sl: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();

    }

    getRecipe(index: number){
        return this.recipes.slice()[index];
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addItoS(ingredients : Ingredient[]){
        this.sl.addI(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
}