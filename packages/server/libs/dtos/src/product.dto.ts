import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, Min, IsString, IsUUID } from 'class-validator';
import { CollectionTypeDTO } from '.';

export class ProductDTO {
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  @Min(5)
  name: string;

  @ApiProperty({ required: true })
  @IsCurrency()
  price: number;

  @ApiProperty({ required: true })
  @IsString()
  image: string;

  @ApiProperty()
  collectionType: CollectionTypeDTO;

  constructor({ id, name, price, image }: any = {}) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}
