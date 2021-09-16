import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    RecipesModule,
    IngredientsModule,
    MongooseModule.forRoot('mongodb://localhost/testDB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
