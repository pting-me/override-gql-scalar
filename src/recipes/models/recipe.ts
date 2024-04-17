import { GraphQLDateTime } from 'graphql-scalars';

import {
  Field,
  ID,
  InterfaceType,
  MiddlewareContext,
  NextFn,
  ObjectType,
} from '@nestjs/graphql';
import { METADATA_FACTORY_NAME } from '@nestjs/graphql/plugin';

@InterfaceType()
export abstract class Base {
  @Field((type) => ID)
  id: string;
}

@InterfaceType({
  description: 'example interface',
  resolveType: (value) => {
    return Recipe;
  },
})
export abstract class IRecipe extends Base {
  @Field()
  title: string;
}

@ObjectType({ implements: IRecipe, description: 'recipe object type' })
export class Recipe extends IRecipe {
  @Field({
    nullable: true,
    middleware: [
      async (ctx: MiddlewareContext, next: NextFn) => {
        const value = await next();
        return value ? 'Description: ' + value : 'Placeholder';
      },
    ],
  })
  description?: string;

  @Field(() => GraphQLDateTime)
  createdAt: Date;

  // This will be automatically added as GraphQLISODateTime
  // which causes a naming conflict
  // @Field()
  // updatedAt: Date;

  @Field()
  get averageRating(): number {
    return 0.5;
  }

  constructor(recipe: Partial<Recipe>) {
    super();
    Object.assign(this, recipe);
  }

  static [METADATA_FACTORY_NAME]() {
    return {
      lastRate: {
        nullable: true,
        type: () => Number,
        description: 'last rate description',
      },
      tags: { nullable: false, type: () => [String] },
      averageRating: {
        description: "The recipe's average rating",
      },
      creationDate: {},
    };
  }
}
