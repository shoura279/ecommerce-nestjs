import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
export type productDocument = Product & Document;
@Schema({ toJSON: { virtuals: true } })
export class Product {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  description: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
    default: 1,
  })
  stock: number;
}

const productsSchema = SchemaFactory.createForClass(Product);
productsSchema.virtual('total price').get(function (this: productDocument) {
  return this.price * this.stock;
});
export { productsSchema };
