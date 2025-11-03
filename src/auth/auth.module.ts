import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports : [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || '', // put in env in real app
      signOptions: { expiresIn: '7d' },     // token valid for 7 days
    }),
  ] , 
  providers: [AuthService , JwtStrategy],
  controllers: [AuthController] , 
  exports : [AuthService ,  JwtModule]
})
export class AuthModule {}
