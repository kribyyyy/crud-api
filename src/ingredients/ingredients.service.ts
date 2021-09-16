import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ignoreElements } from 'rxjs';

import { IngredientSchema, Ingredient } from './ingredient.model';

@Injectable()
export class IngredientsService {
  private ingredients: Ingredient[] = [];

  constructor(
    @InjectModel('Ingredients')
    private readonly ingredientModel: Model<Ingredient>,
  ) {}

  async addIngredient(name: string, amount: number, measurement: string) {
    const newRecipe = new this.ingredientModel({ name, amount, measurement });
    const result = await newRecipe.save();
    return result.id as string;
  }

  async getAllIngredients() {
    const ingredients = await this.ingredientModel.find().exec();
    return ingredients.map((ing) => ({
      id: ing.id,
      name: ing.name,
      amount: ing.amount,
      measurement: ing.measurement,
    }));
  }

  async getIngredient(id: string): Promise<Ingredient> {
    let ingredient;
    try {
      ingredient = await this.ingredientModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find ingredient');
    }

    return ingredient;
  }

  async updateIngredient(
    id: string,
    name: string,
    amount: number,
    measurement: string,
  ): Promise<Ingredient> {
    const filter = { _id: id };
    const update = { name, amount, measurement };
    try {
      return await this.ingredientModel.findByIdAndUpdate(filter, update);
    } catch (error) {
      throw new NotFoundException('Could not find ingredient');
    }
  }

  async deleteIngredient(id: string) {
    try {
      await this.ingredientModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find ingredient');
    }
  }
}
