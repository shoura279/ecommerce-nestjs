import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDTO } from './DTO/addCartDTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../src/guards/auth/auth.guard';
import { RolesGuard } from '../../../src/guards/roles/roles.guard';
import { Role } from '../../../src/guards/roles/roles.enum';
import { Roles } from '../../../src/guards/roles/roles.decorator';
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly _CartService: CartService) {}
  // add to cart
  @ApiOperation({ summary: 'add to cart' })
  @Post('add')
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  addToCart(@Req() request: any, @Body() body: AddCartDTO) {//express
    return this._CartService.addToCart(request, body);
  }

  // get user cart
  @ApiOperation({ summary: 'get all my cart product' })
  @Get('')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  userCart(@Req() request: any) {
    return this._CartService.userCart(request);
  }

  // remove product
  @ApiOperation({ summary: 'remove product from cart' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Put('removeproduct/:productId')
  removePrduct(@Req() request: any, @Param() params: any) {
    return this._CartService.removeProduct(request, params);
  }

  // clear cart
  @ApiOperation({ summary: 'clearcart' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Put('clear')
  clearCart(@Req() request: any) {
    return this._CartService.clearCart(request);
  }
}
