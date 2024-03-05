import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { orderStatus, paymentMethod } from '../../../src/utils/enum';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Product {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: number;
  @ApiProperty()
  @Prop({ required: true })
  name: string;
  @ApiProperty()
  @Prop({ required: true })
  itemPrice: number;
  @ApiProperty()
  @Prop({ required: true })
  quantity: number;
  @ApiProperty()
  @Prop({ required: true })
  totalPrice: number;
}

@Schema({ timestamps: true })
export class Order {
  @ApiProperty()
  @Prop({
    type: Number,
    required: true, // TODO:true
  })
  userId: number;
  @ApiProperty()
  @Prop({ type: [Product] })
  products: Product[];
  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  address: string;
  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  phone: string;
  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
  })
  price: number;
  @ApiProperty()
  @Prop({
    type: String,
    default: orderStatus.placed,
    enum: Object.values(orderStatus),
  })
  status: string;
  @ApiProperty()
  @Prop({
    type: String,
    default: paymentMethod.cash,
    enum: Object.values(paymentMethod),
  })
  payment: string;
}
export const orderSchema = SchemaFactory.createForClass(Order);
