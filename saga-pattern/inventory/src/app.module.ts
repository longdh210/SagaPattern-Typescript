import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { CheckProductAvailabitityController } from './usecases/fetch-available-products/check-products-availability.controller';
import { UpdateStockController } from './usecases/update-stock/update-stock.controller';
import { ProductRepository } from './repositories/memory/product.repository';
import { ProductService } from './services/product.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  controllers: [CheckProductAvailabitityController, UpdateStockController],
  providers: [
    {
      provide: 'product-repository',
      useClass: ProductRepository,
    },
    {
      provide: 'product-service',
      useClass: ProductService,
    },
  ],
})
export class AppModule {}
