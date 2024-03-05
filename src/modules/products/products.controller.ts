import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put, Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';

import { updateProductDto } from './dto/updateProductDto';
import { createProductDTO } from './dto/createProductDTO';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { Roles } from '../../guards/roles/roles.decorator';
import { Role } from '../../guards/roles/roles.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) { }

  // create product
  @ApiOperation({ summary: 'add product' })
  @Post('add')
  @HttpCode(201)
  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  createProduct(@Body() body: createProductDTO) {
    return this._productsService.createProduct(body);
  }

  @ApiOperation({ summary: 'get all product' })
  @Get()
  @HttpCode(200)
  getAllProducts(@Body() body: object) {
    return this._productsService.getAll(body);
  }
  @ApiOperation({ summary: 'add specific product' })
  @Get('/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  getProduct(@Param('id') productId: string) {
    return this._productsService.getProduct(productId);
  }
  @ApiOperation({ summary: 'update product' })
  @Put('updateProduct/:id')
  @HttpCode(201)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateProduct(@Param('id') productId: string, @Body() body: updateProductDto) {
    return this._productsService.updateProduct(body, productId);
  }



  // delete product
  @ApiOperation({ summary: 'delete specific product' })
  @Delete('delete/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteProduct(@Param() params: object) {
    return this._productsService.deleteProduct(params);
  }
}
