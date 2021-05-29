import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CollectionDTO } from '@nelp/dtos';
import { Collection } from '@nelp/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly repo: EntityRepository<Collection>,
  ) {}

  async create(dto: CollectionDTO) {
    const collection = new Collection(dto);
    await this.repo.persistAndFlush(collection);
    return collection;
  }

  async update(dto: CollectionDTO) {
    const collection = await this.repo.findOne(dto.id);
    wrap(collection).assign(dto);
    await this.repo.flush();
    return collection;
  }

  find() {
    return this.repo.findAll({
      orderBy: {
        name: QueryOrder.ASC,
      },
      populate: ['types'],
    });
  }

  findByID(id: string) {
    return this.repo.findOne({ id });
  }

  remove(id: string) {
    return this.repo.nativeDelete({ id });
  }
}
