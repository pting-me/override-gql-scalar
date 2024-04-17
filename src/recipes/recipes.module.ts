import { Module } from '@nestjs/common';

import { IngredientsResolver } from './ingredients.resolver';
import { IRecipesResolver } from './irecipes.resolver';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  providers: [
    IngredientsResolver,
    RecipesResolver,
    IRecipesResolver,
    RecipesService,
  ],
})
export class RecipesModule {}
