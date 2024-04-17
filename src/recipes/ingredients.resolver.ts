import { ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Ingredient } from './models/ingredient';

@Resolver((of) => Ingredient)
export class IngredientsResolver {
  @ResolveField(() => ID)
  id(@Parent() { id }: Ingredient): string {
    return id;
  }

  @ResolveField()
  name(@Parent() { name }: Ingredient): string {
    return name;
  }

  @ResolveField()
  baseName(@Parent() { name }: Ingredient): string {
    return name;
  }
}
