import { ApiProperty } from '@nestjs/swagger';
import { Min, IsString, IsUUID } from 'class-validator';
import { CollectionTypeDTO } from './collection-type.dto';

export class CollectionDTO {
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  @Min(5)
  name: string;

  @ApiProperty()
  types: CollectionTypeDTO[];

  constructor({ id, name }: any = {}) {
    this.id = id;
    this.name = name;
  }
}
