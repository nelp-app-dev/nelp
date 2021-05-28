// import { CartDTO } from '@nelp/dtos';
// import { CartEntity } from '@nelp/entities';
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DeleteResult, Repository } from 'typeorm';

// @Injectable()
// export class CartService {
//   constructor(
//     @InjectRepository(CartEntity) private repo: Repository<CartEntity>,
//   ) {}

//   save(dto: CartDTO): Promise<CartEntity> {
//     return this.repo.save(dto);
//   }

//   find(): Promise<CartEntity[]> {
//     return this.repo.find();
//   }

//   findByID(id: string): Promise<CartEntity> {
//     return this.repo.findOne(id);
//   }

//   remove(id: string): Promise<DeleteResult> {
//     return this.repo.delete(id);
//   }
// }
