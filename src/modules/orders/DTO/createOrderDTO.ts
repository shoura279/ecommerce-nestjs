import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { paymentMethod } from '../../../../src/utils/enum';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'addres for user to delvier order' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('EG')
  @ApiProperty({ description: 'phone for user to contact him' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Object.values(paymentMethod))
  @ApiProperty({ description: 'cash or visa' })
  payment: string;
}
