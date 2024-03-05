import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createProductDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;
  
}
