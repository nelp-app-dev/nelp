import { ApiProperty } from '@nestjs/swagger';
import { Min, IsString, IsUUID } from 'class-validator';
import { CollectionDTO } from '.';

export class CollectionTypeDTO {
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  @Min(5)
  name: string;

  @ApiProperty()
  collection: CollectionDTO;

  constructor({ id, name }: any = {}) {
    this.id = id;
    this.name = name;
  }
}
