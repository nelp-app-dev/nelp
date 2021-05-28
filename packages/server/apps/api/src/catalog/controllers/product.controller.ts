import { BaseController } from '@nelp/base';
import { ProductDTO } from '@nelp/dtos/product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController extends BaseController {
  constructor(@Inject('CATALOG_SERVICE') client: ClientProxy) {
    super('CATALOG_SERVICE', client);
  }

  @Post()
  create(@Body() dto) {
    return this.client.send('PRODUCT_CREATE', dto);
  }

  @Get()
  async find(@Res() res) {
    const dtos = await this.client.send('PRODUCT_FIND', {}).toPromise();
    res.set({
      'X-Total-Count': dtos.length,
      'Content-Range': dtos.length,
    });
    return res.json(dtos);
  }

  @Get(':id')
  findByID(@Param('id') id) {
    return this.client.send('PRODUCT_FIND_BY_ID', id);
  }

  @Put(':id')
  update(@Body() dto) {
    return this.client.send('PRODUCT_UPDATE', dto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.client.send('PRODUCT_REMOVE', id);
  }
}
