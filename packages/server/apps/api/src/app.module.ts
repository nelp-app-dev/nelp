import { Session } from '@nelp/databases';
import { HttpExceptionFilter } from '@nelp/filters/http-exception.filter';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CartModule } from './cart/cart.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [Session, CatalogModule, CartModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
