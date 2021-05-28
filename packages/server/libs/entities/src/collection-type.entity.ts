import { Cascade, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '@nelp/base';
// import slugify from 'slugify';
import { Collection } from './collection.entity';

@Entity()
export class CollectionType extends BaseEntity {
  @Property()
  name: string;

  // @Property()
  // slug: string;

  @ManyToOne({ entity: () => Collection, cascade: [Cascade.ALL] })
  collection!: Collection;

  constructor({ name }: any = {}) {
    super();
    this.name = name;
  }
}
