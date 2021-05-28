// import { ProductTypeDTO } from '@nelp/dtos';
// import { ProductTypeEntity } from '@nelp/entities';
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DeleteResult, Repository } from 'typeorm';

// @Injectable()
// export class ProductTypeService {
//   constructor(
//     @InjectRepository(ProductTypeEntity)
//     private repo: Repository<ProductTypeEntity>,
//   ) {}

//   save(dto: ProductTypeDTO): Promise<ProductTypeEntity> {
//     return this.repo.save(dto);
//   }

//   find(): Promise<ProductTypeEntity[]> {
//     return this.repo.find();
//   }

//   findByID(id: string): Promise<ProductTypeEntity> {
//     return this.repo.findOne(id);
//   }

//   remove(id: string): Promise<DeleteResult> {
//     return this.repo.delete(id);
//   }
// }
