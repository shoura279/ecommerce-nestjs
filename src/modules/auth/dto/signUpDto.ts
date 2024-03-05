import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class signUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'name for user' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'email for user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ description: 'password for user' })
  password: string;

  @IsEnum(['user', 'admin'])
  @IsOptional()
  @ApiProperty({ description: 'user or admin' })
  role: string;
}
