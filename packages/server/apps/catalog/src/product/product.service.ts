import { EntityRepository, LoadStrategy, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Collection, CollectionType, Product } from '@nelp/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: EntityRepository<Product>,
  ) {}

  async create(dto) {
    const product = new Product(dto);
    if (dto.collectionType) {
      product.collectionType = new CollectionType(dto.collectionType);
      if (dto.collectionType.collection) {
        product.collectionType.collection = new Collection(
          dto.collectionType.collection,
        );
      }
    }
    await this.repo.persistAndFlush(product);
    return product;
  }

  async update(dto) {
    const product = await this.repo.findOne(dto.id);
    wrap(product).assign(dto);
    await this.repo.flush();
    return product;
  }

  find() {
    return this.repo.findAll({ populate: ['collectionType.collection'] });
  }

  findByID(id: string) {
    return this.repo.findOne(
      { id },
      {
        populate: ['collectionType.collection'],
      },
    );
  }

  remove(id: string) {
    return this.repo.nativeDelete({ id });
  }
}
