import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

// Import own module files
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { PostModule } from './resources/post/post.module';
import { CommentModule } from './resources/comment/comment.module';
import { BrandModule } from './resources/brand/brand.module';
import { CarModule } from './resources/car/car.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      //formatError: (error) => ({ message: error.message, status: error.extensions.status })
    }),
    PostModule,
    CommentModule,
    BrandModule,
    CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
