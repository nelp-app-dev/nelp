import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as pg from 'pg';
import { CollectionModule } from './collection/collection.module';
import mikroORMConfig from './mikro-orm.config';
import { CollectionTypeModule } from './collection-type/collection-type.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('pg-camelcase').inject(pg);

mikroORMConfig.host = 'postgres';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroORMConfig as any),
    ProductModule,
    CollectionModule,
    CollectionTypeModule,
    // ProductTypeModule,
    // CollectionModule,
  ],
})
export class CatalogModule {}
