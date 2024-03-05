import { MongooseModule } from '@nestjs/mongoose';
import { Product, productsSchema } from './Schemas/Products.schema';
import { Order, orderSchema } from './Schemas/order.schema';
import { Cart, cartSchema } from './Schemas/cart.schema';

export const models = MongooseModule.forFeature([
  { name: Product.name, schema: productsSchema },
  { name: Order.name, schema: orderSchema },
  { name: Cart.name, schema: cartSchema },
]);
