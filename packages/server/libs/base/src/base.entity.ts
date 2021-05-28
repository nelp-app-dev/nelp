import { PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

export class BaseEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'boolean' })
  isActive = true;

  @Property({ type: 'boolean' })
  isArchived = false;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'string' })
  createdBy = 'SYSTEM';

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'string' })
  updatedBy = 'SYSTEM';

  @Property({
    nullable: true,
    length: 300,
  })
  internalComment: string;
}
