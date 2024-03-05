import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductDBService } from '../../Db/dbMethod/product.db.service';
import { createProductDTO } from './dto/createProductDTO';

@Injectable()
export class ProductsService {
  constructor(private readonly _ProductDBService: ProductDBService) {}

  // create product
  //TODO - AUTH
  async createProduct(data: createProductDTO) {
    // get data from req
    const { title, description, price } = data;

    // add to db
    await this._ProductDBService.createProduct({ title, description, price });

    // send response
    return {
      message: 'product added successfully',
      success: true,
    };
  }

  //TODO - AUTH
  async getAll(data: object) {
    const products = await this._ProductDBService.getAll(data);
    return {
      success: true,
      products,
    };
  }

  //TODO - AUTH
  async getProduct(productId: string) {
    const product = await this._ProductDBService.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return {
      success: true,
      product,
    };
  }

  //TODO - AUTH
  async updateProduct(data: object, productId: string) {
    const isProduct = await this._ProductDBService.findById(productId);
    if (!isProduct) {
      throw new NotFoundException(`Product not found`);
    }

    const product = await this._ProductDBService.updateProduct(data, productId);

    return {
      message: 'product updated successfully',
      success: true,
      product,
    };
  }

  // delete product
  async deleteProduct(params: object) {
    const product = await this._ProductDBService.deleteProduct(params['id']);
    if (product)
      return { message: 'product deleted successfully', success: true };
    throw new HttpException('in-valid id', HttpStatus.NOT_FOUND);
  }
}
