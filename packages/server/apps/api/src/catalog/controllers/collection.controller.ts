import { BaseController } from '@nelp/base';
import { CollectionDTO } from '@nelp/dtos';
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

@ApiTags('collections')
@Controller('collections')
export class CollectionController extends BaseController {
  constructor(@Inject('CATALOG_SERVICE') client: ClientProxy) {
    super('CATALOG_SERVICE', client);
  }

  @Post()
  create(@Body() dto) {
    return this.client.send('COLLECTION_CREATE', dto);
  }

  @Get('')
  async find(@Res() res) {
    const dtos = await this.client.send('COLLECTION_FIND', {}).toPromise();
    res.set({
      'X-Total-Count': dtos.length,
      'Content-Range': dtos.length,
    });
    return res.json(dtos);
  }

  @Get(':id')
  findByID(@Param('id') id) {
    return this.client.send('COLLECTION_FIND_BY_ID', id);
  }

  @Put(':id')
  update(@Body() dto) {
    return this.client.send('COLLECTION_UPDATE', dto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.client.send('COLLECTION_REMOVE', id);
  }
}
