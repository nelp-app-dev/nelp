import {
  Entity,
  OneToMany,
  Property,
  Collection as MikroCollection,
} from '@mikro-orm/core';
import { BaseEntity } from '@nelp/base';
// import slugify from 'slugify';
import { CollectionType } from './collection-type.entity';

@Entity()
export class Collection extends BaseEntity {
  @Property()
  name: string;

  // @Property()
  // slug: string;

  @OneToMany(() => CollectionType, (type) => type.collection)
  types = new MikroCollection<CollectionType>(this);

  constructor({ name }: any = {}) {
    super();
    this.name = name;
  }
}
