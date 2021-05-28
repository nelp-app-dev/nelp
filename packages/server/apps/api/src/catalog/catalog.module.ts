import { CatalogClientProxy } from '@nelp/config';
import { Module } from '@nestjs/common';
import { CollectionTypeController } from './controllers/collection-type.controller';
import { CollectionController } from './controllers/collection.controller';
// import { ProductTypeController } from './controllers/product-type.controller';
import { ProductController } from './controllers/product.controller';

@Module({
  providers: [CatalogClientProxy],
  controllers: [
    ProductController,
    CollectionController,
    CollectionTypeController,
  ],
})
export class CatalogModule {}
