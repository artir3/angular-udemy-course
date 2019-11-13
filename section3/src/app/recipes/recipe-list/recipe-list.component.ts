import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Test 1", "sipmle test", "https://s3.przepisy.pl/przepisy3ii/img/variants/767x0/curry-z-kurczaka.jpg"),
    new Recipe("Test 2", "sipmle test", "https://s3.przepisy.pl/przepisy3ii/img/variants/767x0/curry-z-kurczaka.jpg")
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
