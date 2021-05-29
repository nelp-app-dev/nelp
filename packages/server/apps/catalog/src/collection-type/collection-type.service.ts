import { EntityRepository, Populate, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Collection, CollectionType } from '@nelp/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CollectionTypeService {
  constructor(
    @InjectRepository(CollectionType)
    private readonly repo: EntityRepository<CollectionType>,
  ) {}

  async create(dto) {
    const collectionType = new CollectionType(dto);
    collectionType.collection = new Collection(dto.collection);
    await this.repo.persistAndFlush(collectionType);
    return collectionType;
  }

  async update(dto) {
    const collectionType = new CollectionType(dto);
    collectionType.collection = new Collection(dto.collection);

    // const collectionType = await this.repo.findOne(dto.id);
    wrap(collectionType).assign(dto);
    await this.repo.flush();
    return collectionType;
  }

  find() {
    return this.repo.findAll({
      orderBy: {
        collection: { name: QueryOrder.ASC },
        name: QueryOrder.ASC,
      },
      populate: ['collection'],
    });
  }

  findByID(id: string) {
    return this.repo.findOne({ id }, { populate: ['collection'] });
  }

  findFromCollection(collection: any) {
    return this.repo.find(
      { collection: collection.id },
      { populate: ['collection.types'] } as Populate<CollectionType>,
      { orderBy: { name: QueryOrder.ASC } },
    );
  }

  remove(id: string) {
    return this.repo.nativeDelete({ id });
  }
}
