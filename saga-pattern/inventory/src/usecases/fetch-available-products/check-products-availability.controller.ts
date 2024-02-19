import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductServiceInterface } from 'src/services/product.service.interface';

type CheckProductAvailabilityMessage = {
  products: [
    {
      id: string;
      quantity: number;
    },
  ];
};

@Controller()
export class CheckProductAvailabitityController {
  constructor(
    @Inject('product-service')
    private readonly service: ProductServiceInterface,
  ) {}

  @MessagePattern('inventory.products.get')
  checkProductAvailability(
    @Payload() message: CheckProductAvailabilityMessage,
  ) {
    return {
      available: this.service.checkProductAvailability(
        message.products.reduce(
          (result, { id, quantity }) => ({ ...result, [id]: quantity }),
          {},
        ),
      ),
    };
  }
}
