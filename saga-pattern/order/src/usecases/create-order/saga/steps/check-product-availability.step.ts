import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import config from 'src/config';
import { Order } from 'src/entities/order';
import { Step } from './step';
import { lastValueFrom } from 'rxjs';
import { OutOfStockError } from 'src/exceptions/out-of-stock-error';

@Injectable()
export class CheckProductsAvailabilityStep extends Step<Order, void> {
  constructor(
    @Inject(config().services.inventory.name)
    private inventoryClient: ClientKafka,
  ) {
    super();
    this.name = 'Check Products Availability Step';
  }

  async invoke(order: Order): Promise<void> {
    const availableProducts = await lastValueFrom(
      this.inventoryClient.send('inventory.products.get', {
        products: order.orderItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      }),
    );

    if (!availableProducts.available) {
      throw new OutOfStockError(
        `${order.orderItems.map((item) => item.productId)} is not available`,
      );
    }
  }

  withCompenstation(params: Order): Promise<void> {
    console.log('with compenstation', params);
    return Promise.resolve();
  }

  async onModuleInit() {
    this.inventoryClient.subscribeToResponseOf('inventory.products.get');
    await this.inventoryClient.connect();
  }
}
