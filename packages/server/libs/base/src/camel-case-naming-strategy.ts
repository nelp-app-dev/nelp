import { AbstractNamingStrategy } from '@mikro-orm/core';
import { camelCase } from 'lodash';

export class CamelCaseNamingStrategy extends AbstractNamingStrategy {
  classToTableName(entityName: string): string {
    return this.underscore(entityName);
  }

  joinColumnName(propertyName: string, className?: string): string {
    return this.underscore(propertyName) + '_' + this.referenceColumnName();
  }

  joinKeyColumnName(entityName: string, referencedColumnName?: string): string {
    return camelCase(
      this.classToTableName(entityName) +
        '_' +
        (referencedColumnName || this.referenceColumnName()),
    );
  }

  joinTableName(
    sourceEntity: string,
    targetEntity: string,
    propertyName?: string,
  ): string {
    return camelCase(
      this.classToTableName(sourceEntity) +
        '_to_' +
        this.classToTableName(targetEntity),
    );
  }

  propertyToColumnName(propertyName: string): string {
    return this.underscore(propertyName);
  }

  referenceColumnName(): string {
    return 'id';
  }

  private underscore(name: string): string {
    return camelCase(name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase());
  }
}
