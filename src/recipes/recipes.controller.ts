import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private service: RecipesService) {}

  @Post()
  addRecipes(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('servings') servings: number,
    @Body('prepTime') prepTime: number,
    @Body('cookTime') cookTime: number,
  ) {
    const generatedId = this.service.addRecipe(
      title,
      description,
      servings,
      prepTime,
      cookTime,
    );

    return { id: generatedId };
  }

  @Get()
  getAllRecipe() {
    return this.service.getAllRecipes();
  }

  @Get(':id')
  getRecipe(@Param('id') id: string) {
    return this.service.getRecipe(id);
  }

  @Patch(':id')
  updateRecipe(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('servings') servings: number,
    @Body('prepTime') prepTime: number,
    @Body('cookTime') cookTime: number,
  ) {
    this.service.updateRecipe(
      id,
      title,
      description,
      servings,
      prepTime,
      cookTime,
    );
    return { success: true };
  }

  @Delete(':id')
  removeRecipe(@Param('id') id: string) {
    this.service.deleteRecipe(id);
    return { success: true };
  }
}
