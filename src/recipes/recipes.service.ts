import { Injectable, NotFoundException } from '@nestjs/common';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  addRecipe(
    title: string,
    description: string,
    servings: number,
    prepTime: number,
    cookTime: number,
  ) {
    let dt = new Date();
    let recipeId = dt.getTime().toString();

    const newRecipe = new Recipe(
      recipeId,
      title,
      description,
      servings,
      prepTime,
      cookTime,
    );
    this.recipes.push(newRecipe);
    return recipeId;
  }

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(id: string) {
    const recipe = this.findRecipe(id)[0];

    return { ...recipe };
  }

  updateRecipe(
    id: string,
    title: string,
    description: string,
    servings: number,
    prepTime: number,
    cookTime: number,
  ) {
    const [recipe, index] = this.findRecipe(id);
    const updatedRecipe = { ...recipe };
    updatedRecipe.title = title ? title : updatedRecipe.title;
    updatedRecipe.description = description
      ? description
      : updatedRecipe.description;
    updatedRecipe.servings = servings ? servings : updatedRecipe.servings;
    updatedRecipe.prepTime = prepTime ? prepTime : updatedRecipe.prepTime;
    updatedRecipe.cookTime = cookTime ? cookTime : updatedRecipe.cookTime;

    this.recipes[index] = updatedRecipe;
  }

  deleteRecipe(id: string) {
    const index = this.findRecipe(id)[1];
    this.recipes.splice(index, 1);
  }

  private findRecipe(id): [Recipe, number] {
    const recipeIndex = this.recipes.findIndex((recipe) => recipe.id === id);
    const recipe = this.recipes[recipeIndex];
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return [recipe, recipeIndex];
  }
}
