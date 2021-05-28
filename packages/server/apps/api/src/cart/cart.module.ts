import { CartClientProxy } from '@nelp/config';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';

@Module({
  providers: [CartClientProxy],
  controllers: [CartController],
})
export class CartModule {}
