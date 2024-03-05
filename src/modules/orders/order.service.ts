import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderDBService } from '../../../src/DB/dbMethod/order.db.service';
import { ProductDBService } from '../../../src/Db/dbMethod/product.db.service';
import { OrderDto } from './DTO/createOrderDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from '../../../src/Db/Schemas/cart.schema';
import { Model } from 'mongoose';
import { sendEmail } from '../../../src/utils/sendEmail';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private readonly _ProductDBService: ProductDBService,
    private readonly _OrderDBService: OrderDBService,
  ) {}
  async createOrder(req: any, data: OrderDto) {
    // get data from req
    const userId = req['user']['id'];
    const user = req['user'];
    const { address, phone, payment } = data;
    const cart = await this.cartModel.findOne({ userId });
    let products = cart.products;
    // products.reduce()
    if (products.length < 1)
      throw new HttpException('empty cart', HttpStatus.BAD_REQUEST);
    let orderPrice = 0;
    let orderProducts = [];
    for (let i = 0; i < products.length; i++) {
      const product = await this._ProductDBService.findById(// findMay is better push id's
        products[i]['productId'],
      );
      // check product existance
      if (!product) {
        throw new HttpException(
          `product ${products[i]['productId']} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      // check in stock
      if (products[i]['quantity'] > product['stock']) {
        throw new HttpException(
          `${product['_id']} out of stock`,
          HttpStatus.BAD_REQUEST,
        );
      }
      orderProducts.push({
        productId: product['_id'],
        quantity: products[i]['quantity'],
        name: product['name'],
        itemPrice: product['price'],
        totalPrice: products[i]['quantity'] * product['price'],
      });
      orderPrice += products[i]['quantity'] * product['price'];
    }
    // create order
    const order = await this._OrderDBService.createOrder({
      userId,
      products: orderProducts,
      address,
      phone,
      payment,
      price: orderPrice,
    });
    // send email
    sendEmail(user['email'], 'order details', `<p>${order.price}</p>`);
    // send response
    return {
      message: 'order added',
      success: true,
    };
  }
  // todo:
  // async updateStock(){

  // }
}
