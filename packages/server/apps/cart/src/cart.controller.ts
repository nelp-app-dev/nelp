import { CartDTO } from '@nelp/dtos';
import { Controller, Logger, Session } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(
  'sk_test_51IsqShFzcRQJnIkIushDx4wGiWBKpRnpc6y24Gb2Y8AwuyUiabr7iGkI1ogTqi2tGSR5G0y0OgnGqRa1Crx1323o001mdGzATd',
);

const key = (id) => `carts:${id}`;
const calculatePrices = ({ ...cart }) => {
  cart.total = 0;
  cart.items.forEach((item) => {
    item.price = item.product.price * item.quantity;
    cart.total += item.price;
  }, 0);
  return cart;
};

@Controller()
export class CartController {
  logger = new Logger('CART_CLIENT');

  constructor(@InjectRedis() private readonly redis: Redis) {}

  // @MessagePattern('CART_SAVE')
  // async save(@Payload() dto, @Session() session: { carts?: CartDTO[] }) {
  //   session.carts = (session.views || 0) + 1;
  // }

  // @MessagePattern('CART_FIND')
  // async find(): Promise<CartDTO[]> {
  //   const entities = await this.service.find();
  //   return entities.map((entity) => CartDTO.fromEntity(entity));
  // }

  @MessagePattern('CART_FIND_BY_ID')
  async findByID(
    @Payload() id: string,
    @Session() session: { carts?: CartDTO[] },
  ) {
    return (session.carts || [])[0];
  }

  @MessagePattern('CART_ADD_ITEM')
  async addItem(@Payload() { cart, product }) {
    // try to find if product already in cart.
    const itemIndex = cart.items.findIndex(
      (item) => item.product.id === product.id,
    );

    // if it isn't, add it
    // else, increment its quantity
    if (itemIndex === -1) {
      cart.items.push({
        id: uuidv4(),
        quantity: 1,
        product,
      });
    } else {
      cart.items[itemIndex].quantity += 1;
    }

    return calculatePrices(cart);
  }

  @MessagePattern('CART_REMOVE_ITEM')
  async removeItem(@Payload() { cart, product, quantity }) {
    if (!cart) return null;

    // try to find if product already in cart.
    const itemIndex = cart.items.findIndex(
      (item) => item.product.id === product.id,
    );

    // if it is, decrement its quantity
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity -= quantity;
      if (cart.items[itemIndex].quantity === 0) cart.items.splice(itemIndex, 1);
    }

    return calculatePrices(cart);
  }

  @MessagePattern('CART_PAY')
  async pay(@Payload() { amount }) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  // @MessagePattern('CART_REMOVE')
  // remove(@Payload() id: string): Promise<DeleteResult> {
  //   return this.service.remove(id);
  // }
}
