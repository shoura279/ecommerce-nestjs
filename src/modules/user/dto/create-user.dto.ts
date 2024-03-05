import { IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must have at least 8 chars' })
    @MaxLength(50, { message: 'Password must have at Max 50 chars' })
    @IsStrongPassword()
    password: string;

    @IsEnum(['user', 'admin'], { message: 'Role must be one of (user,admin)' })
    @IsOptional()
    role: string

    @IsOptional()
    verified: boolean
}
