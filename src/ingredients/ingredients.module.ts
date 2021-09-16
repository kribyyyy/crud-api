import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { IngredientSchema } from './ingredient.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ingredients', schema: IngredientSchema },
    ]),
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
