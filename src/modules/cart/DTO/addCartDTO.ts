import { IsAlphanumeric, IsNotEmpty, IsNumber } from 'class-validator';

export class AddCartDTO {
  @IsAlphanumeric()
  @IsNotEmpty()
  productId: any;
  
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
