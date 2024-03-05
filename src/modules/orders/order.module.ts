import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDBService } from '../../../src/DB/dbMethod/order.db.service';
import { models } from '../../../src/Db/model.generator';
import { ProductDBService } from '../../../src/Db/dbMethod/product.db.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),models],
  controllers: [OrderController],
  providers: [JwtService,OrderService, OrderDBService,ProductDBService],
})
export class OrderModule {}
