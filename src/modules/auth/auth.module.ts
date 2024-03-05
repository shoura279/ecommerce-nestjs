import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { models } from '../../../src/DB/model.generator';
@Module({
  imports: [models,TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService,JwtService],
})
export class AuthModule { }
