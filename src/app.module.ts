import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  
  imports: [TodosModule , MongooseModule.forRoot(process.env.MONGO_URI ), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
