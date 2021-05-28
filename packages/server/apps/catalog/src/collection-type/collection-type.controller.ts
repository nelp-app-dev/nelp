import { CollectionDTO, CollectionTypeDTO } from '@nelp/dtos';
import { Collection, CollectionType } from '@nelp/entities';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CollectionService } from '../collection/collection.service';
import { CollectionTypeService } from './collection-type.service';

@Controller()
export class CollectionTypeController {
  logger = new Logger('COLLECTION_TYPE_CLIENT');

  constructor(
    private readonly service: CollectionTypeService,
    private readonly collectionService: CollectionService,
  ) {}

  @MessagePattern('COLLECTION_TYPE_CREATE')
  async create(@Payload() dto) {
    const entity = await this.service.create(dto);

    return {
      ...new CollectionTypeDTO(entity),
      collection: {
        ...new CollectionDTO(entity.collection),
        types: entity.collection.types
          .toArray()
          .map((type) => new CollectionTypeDTO(type)),
      },
    };
  }

  @MessagePattern('COLLECTION_TYPE_UPDATE')
  async update(@Payload() dto) {
    dto.collection = await this.collectionService.findByID(dto.collection.id);
    const entity = await this.service.update(dto);
    return new CollectionTypeDTO(entity);
  }

  @MessagePattern('COLLECTION_TYPE_FIND')
  async find() {
    const entities = await this.service.find();
    return entities.map((entity) => new CollectionTypeDTO(entity));
  }

  @MessagePattern('COLLECTION_TYPE_FIND_BY_ID')
  async findByID(@Payload() id: string) {
    const entity = await this.service.findByID(id);
    return new CollectionTypeDTO(entity);
  }

  @MessagePattern('COLLECTION_TYPE_REMOVE')
  remove(@Payload() id: string) {
    return this.service.remove(id);
  }
}
