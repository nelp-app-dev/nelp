import { CollectionDTO, CollectionTypeDTO, ProductDTO } from '@nelp/dtos';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import * as fs from 'fs';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { defaultImage } from '@nelp/entities';
import { CollectionTypeService } from '../collection-type/collection-type.service';
import { CollectionService } from '../collection/collection.service';

const uploadImage = async (value = defaultImage) => {
  if (value.indexOf('uploads') !== -1) return value;

  const filename = uuidv4() + '.png';
  fs.writeFileSync(
    resolve(process.cwd(), 'uploads', filename),
    Buffer.from(value.split('base64,')[1], 'base64'),
  );
  return `https://nelp.com:3737/uploads/${filename}`;
};

const toJSON = (entity) => {
  return {
    ...new ProductDTO(entity),
    collectionType: {
      ...new CollectionTypeDTO(entity.collectionType || {}),
      collection: new CollectionDTO(entity.collectionType?.collection),
    },
  };
};

@Controller()
export class ProductController {
  logger = new Logger('PRODUCT_CLIENT');

  constructor(
    private readonly service: ProductService,
    private readonly collectionTypeService: CollectionTypeService,
    private readonly collectionService: CollectionService,
  ) {}

  @MessagePattern('PRODUCT_CREATE')
  async create(@Payload() dto) {
    dto.image = await uploadImage(dto.image);

    if (
      dto.collectionType &&
      dto.collectionType.collection &&
      dto.collectionType.collection.id
    )
      delete dto.collectionType.collection;
    if (dto.collectionType && dto.collectionType.id) delete dto.collectionType;

    const entity = await this.service.create(dto);
    return toJSON(entity);
  }

  @MessagePattern('PRODUCT_UPDATE')
  async update(@Payload() dto) {
    dto.image = await uploadImage(dto.image);
    dto.collectionType = await this.collectionTypeService.findByID(
      dto.collectionType.id,
    );
    const entity = await this.service.update(dto);
    return toJSON(entity);
  }

  @MessagePattern('PRODUCT_FIND')
  async find() {
    const entities = await this.service.find();
    return entities.map((entity) => toJSON(entity));
  }

  @MessagePattern('PRODUCT_FIND_BY_ID')
  async findByID(@Payload() id: string) {
    const entity = await this.service.findByID(id);
    return toJSON(entity);
  }

  @MessagePattern('PRODUCT_REMOVE')
  remove(@Payload() id: string) {
    return this.service.remove(id);
  }
}
