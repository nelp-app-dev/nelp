import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CatalogModule } from './catalog.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    {
      transport: Transport.REDIS,
      options: {
        url: 'redis://redis:6379',
      },
    },
  );
  await app.listen(() => console.log('Catalog Service is listening'));
}
bootstrap();
