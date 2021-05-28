import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from '@nelp/entities';
import { Module } from '@nestjs/common';
import { CollectionTypeModule } from '../collection-type/collection-type.module';
import { CollectionModule } from '../collection/collection.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Product] }),
    CollectionTypeModule,
    CollectionModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
