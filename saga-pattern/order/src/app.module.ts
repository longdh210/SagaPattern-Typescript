import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from './config';
import { CreateOrderController } from './usecases/create-order/create-order.controller';
import { OrderRepository } from './repositories/memory/order.repository';
import { PlaceOrderStep } from './usecases/create-order/saga/steps/place-order.step';
import { CheckProductsAvailabilityStep } from './usecases/create-order/saga/steps/check-product-availability.step';
import { AuthorizePaymentStep } from './usecases/create-order/saga/steps/authorize-payment.step';
import { ConfirmOrderStep } from './usecases/create-order/saga/steps/confirm-order.step';
import { UpdateStockStep } from './usecases/create-order/saga/steps/update-stock.step';
import { CreateOrderSaga } from './usecases/create-order/saga/create-order.saga';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: config().services.inventory.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config().services.order.clientId,
            brokers: [config().broker],
          },
          consumer: {
            groupId: config().services.inventory.groupId,
            // allowAutoTopicCreation: true,
          },
        },
      },
      {
        name: config().services.payment.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config().services.order.clientId,
            brokers: [config().broker],
          },
          consumer: {
            groupId: config().services.payment.groupId,
            // allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  controllers: [CreateOrderController],
  providers: [
    {
      provide: 'order-repository',
      useClass: OrderRepository,
    },
    {
      provide: 'place-order-step',
      useClass: PlaceOrderStep,
    },
    {
      provide: 'check-products-availability',
      useClass: CheckProductsAvailabilityStep,
    },
    {
      provide: 'authorize-payment',
      useClass: AuthorizePaymentStep,
    },
    {
      provide: 'confirm-order',
      useClass: ConfirmOrderStep,
    },
    {
      provide: 'update-stock',
      useClass: UpdateStockStep,
    },
    {
      provide: 'create-order-saga',
      useClass: CreateOrderSaga,
    },
    {
      provide: 'order-service',
      useClass: OrderService,
    },
  ],
})
export class AppModule {}
