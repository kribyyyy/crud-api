import * as mongoose from 'mongoose';

export interface Ingredient extends mongoose.Document {
  id: string;
  name: string;
  amount: number;
  measurement: string;
}

export const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  measurement: { type: String, required: true },
});
