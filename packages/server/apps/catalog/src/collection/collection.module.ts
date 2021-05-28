import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Collection } from '@nelp/entities';
import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Collection] })],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}
