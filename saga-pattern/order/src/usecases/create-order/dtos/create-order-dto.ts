import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @ApiProperty()
  customerId: string;

  @IsNotEmpty()
  @ApiProperty({ type: () => CreateOrderItemDto, isArray: true })
  orderItems: CreateOrderItemDto[];
}

export class CreateOrderItemDto {
  @IsString()
  @ApiProperty()
  productId: string;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @ApiProperty()
  totalPrice: number;
}
