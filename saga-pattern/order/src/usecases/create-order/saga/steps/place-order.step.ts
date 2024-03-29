import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/entities/order';
import { Step } from './step';
import { OrderRepositoryInterface } from '../../../../repositories/order.repository.interface';

@Injectable()
export class PlaceOrderStep extends Step<Order, void> {
  constructor(
    @Inject('order-repository')
    private orderRepository: OrderRepositoryInterface,
  ) {
    super();
    this.name = 'Place Order Step';
  }

  invoke(order: Order): Promise<void> {
    this.orderRepository.save(order);
    return Promise.resolve();
  }

  withCompenstation(order: Order): Promise<void> {
    order.cancel();
    this.orderRepository.update(order);
    return Promise.resolve();
  }
}
