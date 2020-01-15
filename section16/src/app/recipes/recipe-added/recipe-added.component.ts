import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-added',
  templateUrl: './recipe-added.component.html',
  styleUrls: ['./recipe-added.component.css']
})
export class RecipeAddedComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  onSubmit() {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    let imagePath = '';
    let description = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name),
      'imagePath': new FormControl(imagePath),
      'description': new FormControl(description)
    })
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
