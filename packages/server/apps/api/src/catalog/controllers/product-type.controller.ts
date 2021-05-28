// import { BaseController } from '@nelp/base';
// import { ProductTypeDTO } from '@nelp/dtos';
// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Inject,
//   Param,
//   Post,
//   Put,
//   Res,
// } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('product-types')
// @Controller('product-types')
// export class ProductTypeController extends BaseController {
//   constructor(@Inject('CATALOG_SERVICE') client: ClientProxy) {
//     super('CATALOG_SERVICE', client);
//   }

//   @Post()
//   create(@Body() productType) {
//     return this.client.send('PRODUCT_TYPE_SAVE', productType);
//   }

//   @Get()
//   async find(@Res() res) {
//     const productTypes = await this.client
//       .send('PRODUCT_TYPE_FIND', {})
//       .toPromise();
//     res.set({
//       'X-Total-Count': productTypes.length,
//       'Content-Range': productTypes.length,
//     });
//     return res.json(
//       productTypes.map((productType) => ProductTypeDTO.fromEntity(productType)),
//     );
//   }

//   @Get(':id')
//   findByID(@Param('id') id) {
//     return this.client.send('PRODUCT_TYPE_FIND_BY_ID', id);
//   }

//   @Put(':id')
//   update(@Body() product) {
//     return this.client.send('PRODUCT_TYPE_SAVE', product);
//   }

//   @Delete(':id')
//   remove(@Param('id') id) {
//     return this.client.send('PRODUCT_TYPE_REMOVE', id);
//   }
// }
