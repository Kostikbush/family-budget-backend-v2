import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorizationModule } from './authorization/authorization.module';

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
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    AuthorizationModule,
  ],
})
export class AppModule {}
