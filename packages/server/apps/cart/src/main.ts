import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CartModule } from './cart.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CartModule,
    {
      transport: Transport.REDIS,
      options: {
        url: 'redis://redis:6379',
      },
    },
  );
  await app.listen(() => console.log('Cart Service is listening'));
}
bootstrap();
