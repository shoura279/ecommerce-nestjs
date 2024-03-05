import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class signInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'email for user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ description: 'password for user' })
  password: string;
}
