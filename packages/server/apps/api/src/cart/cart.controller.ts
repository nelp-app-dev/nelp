import { BaseController } from '@nelp/base';
import { CartDTO } from '@nelp/dtos';
import { v4 as uuidv4 } from 'uuid';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Session,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('carts')
@Controller('carts')
export class CartController extends BaseController {
  constructor(@Inject('CART_SERVICE') client: ClientProxy) {
    super('CART_SERVICE', client);
  }

  @Get('find')
  find(@Session() session: { cart?: CartDTO }) {
    return (
      session.cart || {
        id: uuidv4(),
        total: 0,
        items: [],
      }
    );
  }

  @Post('addItem')
  async addItem(@Session() session: { cart?: CartDTO }, @Body() { product }) {
    const cart = session.cart || {
      id: uuidv4(),
      total: 0,
      items: [],
    };

    session.cart = await this.client
      .send('CART_ADD_ITEM', { cart, product })
      .toPromise();
    return session.cart;
  }

  @Delete('removeItem')
  async removeItem(
    @Session() session: { cart?: CartDTO },
    @Body() { product, quantity },
  ) {
    session.cart = await this.client
      .send('CART_REMOVE_ITEM', {
        cart: session.cart,
        product,
        quantity,
      })
      .toPromise();

    return session.cart;
  }

  @Post('pay')
  pay(@Body() { items }) {
    return this.client.send('CART_PAY', { amount: 107 });
  }
}
