import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export const TransportOptions: ClientOptions = {
  transport: Transport.REDIS,
  options: { url: 'redis://redis:6379' },
};

export const CatalogClientProxy = {
  provide: 'CATALOG_SERVICE',
  useFactory: () => ClientProxyFactory.create(TransportOptions),
};

export const CartClientProxy = {
  provide: 'CART_SERVICE',
  useFactory: () => ClientProxyFactory.create(TransportOptions),
};
