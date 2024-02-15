import { Inject, Injectable } from '@nestjs/common';
import { Step } from './step';
import { Order } from 'src/entities/order';
import config from 'src/config';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PaymentNotSuccessfulError } from 'src/exceptions/payment-not-successful';

@Injectable()
export class AuthorizePaymentStep extends Step<Order, void> {
  constructor(
    @Inject(config().services.payment.name) private paymentClient: ClientKafka,
  ) {
    super();
    this.name = 'Authorize Payment Step';
  }

  async invoke(order: Order): Promise<void> {
    const paymentAuthorization = await lastValueFrom(
      this.paymentClient.send('payment.payment.authorize', {
        orderId: order.id,
        amount: order.orderItems.reduce((accumulator: number, item) => {
          return accumulator + item.totalPrice;
        }, 0),
      }),
    );

    if (!paymentAuthorization.authorized) {
      throw new PaymentNotSuccessfulError('The payment unsuccessful');
    }
  }

  async withCompenstation(order: Order): Promise<void> {
    await lastValueFrom(
      this.paymentClient.send('payment.payment.refund', {
        orderId: order.id,
        amount: order.orderItems.reduce((accumulator: number, item) => {
          return accumulator + item.totalPrice;
        }, 0),
      }),
    );
  }

  async onModuleInit() {
    this.paymentClient.subscribeToResponseOf('payment.payment.authorize');
    this.paymentClient.subscribeToResponseOf('payment.payment.refund');

    await this.paymentClient.connect();
  }
}
