import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../Schemas/order.schema';

@Injectable()
export class OrderDBService {
  constructor(@InjectModel(Order.name) private _OrderModel: Model<Order>) {}

  // create order
  async createOrder(data: object): Promise<Order> {
    const order = await this._OrderModel.create(data);
    return order;
  }

  // get all orders
  async getAll(data: object): Promise<Order[]> {
    // data can be empty object to get all and can pass condition like api feature
    const orders = await this._OrderModel.find(data);
    return orders;
  }

  // get by id
  async findById(id: any): Promise<Order | null> {
    const order = await this._OrderModel.findById(id);
    return order;
  }

  // delete order
  async deleteOrder(id: any): Promise<Order | null> {
    const order = await this._OrderModel.findByIdAndDelete(id);
    return order;
  }

  // update order
  async updateOrder(data: object, id: any): Promise<Order | null> {
    const order = await this._OrderModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return order;
  }
}
