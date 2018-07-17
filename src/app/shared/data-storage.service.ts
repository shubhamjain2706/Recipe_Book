import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable()
export class DataStorageService {

constructor(private httpClient: HttpClient, private rs: RecipeService, private as: AuthService) {} 
// private http: Http, 

storedata() {
    const token = this.as.getIdToken();

    this.httpClient.put('https://ng-recipe-book-cef50.firebaseio.com/recipes.json?auth=' + token, this.rs.getRecipes())
    .subscribe((response: Response) => {
            console.log(response);
        });
    
}

getRecipes() {
    const token = this.as.getIdToken();

    this.httpClient.get<Recipe[]>('https://ng-recipe-book-cef50.firebaseio.com/recipes.json?auth=' + token)
        .pipe(map(
            (recipes: Recipe[]) => {
                // const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients']=[];
                    }
                }
                return recipes;
            }
        ))
        .subscribe((recipes: Recipe[]) => {
            this.rs.setRecipes(recipes);
        });
}

}