import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddCartDTO } from './DTO/addCartDTO';
import { Cart } from '../../../src/Db/Schemas/cart.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../../src/Db/Schemas/Products.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  // add to cart
  async addToCart(req: any, addToCartDto: AddCartDTO) {
    const userId = req['user']['id'];
    const { productId, quantity } = addToCartDto; //naming convention
    try {
      const productCheck = await this.productModel.findById(productId);
      if (!productCheck)
        throw new HttpException('in-valid id', HttpStatus.NOT_FOUND);

      // check quantity
      if (quantity > productCheck.stock) {
        throw new HttpException(
          `only ${productCheck.stock} left in stock`, // don't pass any data to end user
          HttpStatus.BAD_REQUEST,
        );
      }

      // product in cart?
      const isProductInCart = await this.cartModel.findOneAndUpdate(
        {
          userId,
          'products.productId': productId,
        },
        {
          $set: { 'products.$.quantity': quantity },
        },
      );

      if (!isProductInCart) {
        await this.cartModel.findOneAndUpdate(
          { userId },
          {
            $push: { products: { productId, quantity } },
          },
        );
      }
      return {
        message: 'product added to cart',
        success: true,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  // get user cart
  async userCart(req: any) {
    const userId = req['user']['id'];
    const userCart = await this.cartModel.findOne({ userId }).populate([
      {
        path: 'products.productId',
      },
    ]);
    return {
      message: 'done',
      success: true,
      result: userCart,
    };
  }

  // remove product from cart
  async removeProduct(req: any, data: any) {
    const userId = req['user']['id'];
    const { productId } = data;
    await this.cartModel.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true },
    );
    return {
      message: 'product remove successfully',
      success: true,
    };
  }

  // clear cart
  async clearCart(req: any) {
    const userId = req['user']['id'];
    await this.cartModel.findByIdAndUpdate({ userId }, { products: [] });
    return {
      message: 'cart empty ✅',
      success: true,
    };
  }
}
