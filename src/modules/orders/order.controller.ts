import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderDto } from './DTO/createOrderDTO';
import { OrderService } from './order.service';
import { AuthGuard } from '../../../src/guards/auth/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly _OrderService: OrderService) {}
  @ApiOperation({ summary: 'create order' })
  @Post('add')
  @UseGuards(AuthGuard)// role gard
  @HttpCode(201)
  createOrder(@Request() req: any, @Body() body: OrderDto) {
    return this._OrderService.createOrder(req, body);
  }
}
