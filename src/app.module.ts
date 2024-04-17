import { join } from 'node:path';

import { GraphQLScalarType } from 'graphql';
import { GraphQLDateTime } from 'graphql-scalars';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import {
  DateScalarMode,
  GraphQLModule,
  NumberScalarMode,
} from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';

/**
 * Proposed new interface
 */
interface BuildSchemaOptions {
  dateScalarMode?: GraphQLScalarType<Date, unknown> | DateScalarMode;
  numberScalarMode?: GraphQLScalarType<number, unknown> | NumberScalarMode;

  /* ... */
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // Ideally we should be able to do something like the following
      // buildSchemaOptions: {
      //   dateScalarMode: GraphQLDateTime,
      // },
      driver: ApolloDriver,
      resolvers: {
        DateTime: GraphQLDateTime,
      },
    }),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
