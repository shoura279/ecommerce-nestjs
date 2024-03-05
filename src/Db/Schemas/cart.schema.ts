import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
@Schema()
export class Product {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: string;

  @ApiProperty()
  @Prop({ required: true })
  quantity: number;
}
@Schema({ timestamps: true, toJSON: { virtuals: true, getters: true } })
export class Cart {
  @Prop({
    type: Number,
    required: false, // TODO:true
  })
  userId: number;

  @Prop()
  products: Product[];
}
export const cartSchema = SchemaFactory.createForClass(Cart);
