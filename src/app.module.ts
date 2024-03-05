import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, getConfigToken } from '@nestjs/config';
import { OrderModule } from './modules/orders/order.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MOGOOS_DB),
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRE_HOST,
      port: +process.env.POSTGRE_PORT,
      password:process.env.POSTGRE_PASSWORD,
      username: process.env.POSTGRE_USER,
      entities: [User],
      autoLoadEntities: true,
      database: process.env.POSTGRE_DATABASE,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    OrderModule,
    ProductsModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
