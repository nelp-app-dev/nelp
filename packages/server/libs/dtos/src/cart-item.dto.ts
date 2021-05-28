import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber } from 'class-validator';
import { ProductDTO } from './product.dto';

export class CartItemDTO {
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsNumber()
  quantity: number;

  @ApiProperty({ required: true })
  product: ProductDTO;

  // static fromEntity(entity: Product): ProductDTO {
  //   const user = new ProductDTO();
  //   user.id = entity.id;
  //   user.name = entity.name;
  //   user.price = entity.price;
  //   user.image = entity.image;
  //   return user;
  // }

  // toEntity = (): Product => {
  //   const user = new Product();
  //   user.id = this.id;
  //   user.name = this.name;
  //   user.price = this.price;
  //   user.image = this.image;
  //   return user;
  // };
}
