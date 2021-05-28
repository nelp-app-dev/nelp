import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CartItemDTO } from './cart-item.dto';

export class CartDTO {
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  items: CartItemDTO[];

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
