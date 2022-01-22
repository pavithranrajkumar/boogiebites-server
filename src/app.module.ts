import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './schema.gql',
      debug: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      url:process.env.DEV_DB_URL,
      autoLoadEntities: true,
      // synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      logging: true,
  
    }),
    UserModule,
    RestaurantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
