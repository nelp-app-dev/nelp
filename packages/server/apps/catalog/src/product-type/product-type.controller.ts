// import { ProductTypeDTO } from '@nelp/dtos';
// import { ProductTypeEntity } from '@nelp/entities';
// import { Controller, Logger } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
// import { DeleteResult } from 'typeorm';
// import { ProductTypeService } from './product-type.service';

// @Controller()
// export class ProductTypeController {
//   logger = new Logger('PRODUCT_TYPE_CLIENT');

//   constructor(private readonly service: ProductTypeService) {}

//   @MessagePattern('PRODUCT_TYPE_SAVE')
//   async save(@Payload() dto: ProductTypeDTO): Promise<ProductTypeDTO> {
//     const entity = await this.service.save(
//       Object.assign(new ProductTypeEntity(), dto),
//     );
//     return ProductTypeDTO.fromEntity(entity);
//   }

//   @MessagePattern('PRODUCT_TYPE_FIND')
//   async find(): Promise<ProductTypeDTO[]> {
//     const entities = await this.service.find();
//     return entities.map((entity) => ProductTypeDTO.fromEntity(entity));
//   }

//   @MessagePattern('PRODUCT_TYPE_FIND_BY_ID')
//   async findByID(@Payload() id: string): Promise<ProductTypeDTO> {
//     const entity = await this.service.findByID(id);
//     return ProductTypeDTO.fromEntity(entity);
//   }

//   @MessagePattern('PRODUCT_TYPE_REMOVE')
//   remove(@Payload() id: string): Promise<DeleteResult> {
//     return this.service.remove(id);
//   }
// }
