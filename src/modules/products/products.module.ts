import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { models } from '../../Db/model.generator';
import { ProductDBService } from '../../Db/dbMethod/product.db.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [models,TypeOrmModule.forFeature([User])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductDBService,JwtService],
})
export class ProductsModule {}
