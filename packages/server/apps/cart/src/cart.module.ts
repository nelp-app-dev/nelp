import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { RedisModule } from '@nestjs-modules/ioredis';
// import { CartService } from './cart.service';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: 'redis://redis:6379',
      },
    }),
  ],
  controllers: [CartController],
  // providers: [CartService],
})
export class CartModule {}
