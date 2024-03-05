import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { models } from '../../../src/Db/model.generator';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [models,TypeOrmModule.forFeature([User])],
  controllers: [CartController],
  providers: [JwtService,CartService],
})
export class CartModule {}
