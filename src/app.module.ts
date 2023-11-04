import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthorizationModule } from './authorization/authorization.module';
import { BudgetModule } from './budget/budget.module';

const config = () => ({
  // port: parseInt(process.env.PORT, 10) || 8080,
  // api: {
  //   apiUrl: process.env.API_URL,
  //   httpTimeout: 1000,
  // },
  mongodb: {
    database: {
      connectionString: process.env.MONGO_DB_URL,
      //databaseName: process.env.NODE_ENV || 'local'
    },
  },
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [BudgetModule, AuthorizationModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      driver: ApolloDriver,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    AuthorizationModule,
    BudgetModule,
  ],
})
export class AppModule {}
