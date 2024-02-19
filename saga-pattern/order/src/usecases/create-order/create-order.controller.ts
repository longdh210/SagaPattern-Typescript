import {
  Body,
  Controller,
  Get,
  GoneException,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order-dto';
import { OutOfStockError } from 'src/exceptions/out-of-stock-error';
import { PaymentNotSuccessfulError } from 'src/exceptions/payment-not-successful';
import { PaymentRequiredException } from 'src/exceptions/http/payment-required-exception';
import { OrderServiceInterface } from 'src/services/order.service.interface';

@Controller()
export class CreateOrderController {
  constructor(
    @Inject('order-service')
    private readonly service: OrderServiceInterface,
  ) {}

  @Post('/orders')
  async createOrder(@Body() body: CreateOrderDto) {
    try {
      await this.service.createOrder(body);
    } catch (error) {
      if (error instanceof OutOfStockError) {
        throw new GoneException({ message: error.message });
      }
      if (error instanceof PaymentNotSuccessfulError) {
        throw new PaymentRequiredException({ message: error.message });
      }
      throw new InternalServerErrorException({ message: error });
    }
  }

  @Get('/orders')
  async healthCheck() {
    return 'health check';
  }
}
