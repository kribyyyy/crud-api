import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private service: IngredientsService) {}

  @Post()
  async addRecipes(
    @Body('name') name: string,
    @Body('amount') amount: number,
    @Body('measurement') measurement: string,
  ) {
    const generatedId = await this.service.addIngredient(
      name,
      amount,
      measurement,
    );

    return { id: generatedId };
  }

  @Get()
  async getAllIngredients() {
    const ingredients = await this.service.getAllIngredients();
    return ingredients;
  }

  @Get(':id')
  async getIngredient(@Param('id') id: string) {
    return this.service.getIngredient(id);
  }

  @Patch(':id')
  async updateIngredient(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('amount') amount: number,
    @Body('measurement') measurement: string,
  ) {
    const updatedIngredient = await this.service.updateIngredient(
      id,
      name,
      amount,
      measurement,
    );
    return { success: true };
  }

  @Delete(':id')
  async removeIngredient(@Param('id') id: string) {
    await this.service.deleteIngredient(id);
    return { success: true };
  }
}
