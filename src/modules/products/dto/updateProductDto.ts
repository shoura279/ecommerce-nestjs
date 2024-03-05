import { IsOptional, IsString } from "class-validator";

export class updateProductDto {
    @IsOptional()
    @IsString()
    title: string;


    @IsOptional()
    @IsString()
    description: string;
}