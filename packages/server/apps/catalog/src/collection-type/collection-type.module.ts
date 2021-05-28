import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CollectionType } from '@nelp/entities';
import { Module } from '@nestjs/common';
import { CollectionModule } from '../collection/collection.module';
import { CollectionTypeController } from './collection-type.controller';
import { CollectionTypeService } from './collection-type.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [CollectionType] }),
    CollectionModule,
  ],
  controllers: [CollectionTypeController],
  providers: [CollectionTypeService],
  exports: [CollectionTypeService],
})
export class CollectionTypeModule {}
