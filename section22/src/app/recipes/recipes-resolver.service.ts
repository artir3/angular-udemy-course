import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { DatabaseService } from '../shared/database.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverGuard implements Resolve<Recipe[]> {
    constructor(private sbService: DatabaseService,
        private rService: RecipeService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const recipes = this.rService.getRecipes();
        if (recipes.length === 0) {
            return this.sbService.fetechRecipes();
        } else {
            return recipes;
        }
    }
}
