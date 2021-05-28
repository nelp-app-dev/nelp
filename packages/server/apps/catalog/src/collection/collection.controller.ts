import { CollectionDTO } from '@nelp/dtos';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CollectionService } from './collection.service';

@Controller()
export class CollectionController {
  logger = new Logger('COLLECTION_CLIENT');

  constructor(private readonly service: CollectionService) {}

  @MessagePattern('COLLECTION_CREATE')
  async create(@Payload() dto: CollectionDTO) {
    const entity = await this.service.create(dto);
    return new CollectionDTO(entity);
  }

  @MessagePattern('COLLECTION_UPDATE')
  async update(@Payload() dto: CollectionDTO) {
    const entity = await this.service.update(dto);
    return new CollectionDTO(entity);
  }

  @MessagePattern('COLLECTION_FIND')
  async find() {
    const entities = await this.service.find();
    return entities.map((entity) => {
      return {
        ...new CollectionDTO(entity),
        types: entity.types.toArray().map((t) => new CollectionDTO(t)),
      };
    });
  }

  @MessagePattern('COLLECTION_FIND_BY_ID')
  async findByID(@Payload() id: string) {
    const entity = await this.service.findByID(id);
    return new CollectionDTO(entity);
  }

  @MessagePattern('COLLECTION_REMOVE')
  remove(@Payload() id: string) {
    return this.service.remove(id);
  }
}
