import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;

  constructor(private rs: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    // or
    this.route.params.subscribe(
      (params: Params) => {
      this.id = +params['id'];
      this.recipe = this.rs.getRecipe(this.id);
    });
  }

  Add() {
    this.rs.addItoS(this.recipe.ingredients);
  }

  OnEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route});
  }

  OnDeleteRecipe() {
    this.rs.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
