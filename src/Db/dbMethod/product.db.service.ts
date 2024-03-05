import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../Schemas/Products.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductDBService {
  constructor(
    @InjectModel(Product.name) private _productModel: Model<Product>,
  ) {}

  // create product
  async createProduct(data: object): Promise<Product> {
    const product = await this._productModel.create(data);
    return product;
  }

  // get all product
  async getAll(data: object): Promise<Product[]> {
    // data can be empty object to get all and can pass condition like api feature
    const products = await this._productModel.find(data);
    return products;
  }

  // get by id
  async findById(id: any): Promise<Product | null> {
    const product = await this._productModel.findById(id);
    return product;
  }

  // delete product
  async deleteProduct(id: any): Promise<Product | null> {
    const product = await this._productModel.findByIdAndDelete(id);
    return product;
  }

  // update product
  async updateProduct(data: object, id: any): Promise<Product | null> {
    const product = await this._productModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return product;
  }
}
