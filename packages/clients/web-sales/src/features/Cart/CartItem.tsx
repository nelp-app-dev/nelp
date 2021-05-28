import { Box, Button, Text, Image, ScaleFade } from '@chakra-ui/react';
import { MdRemoveCircleOutline, MdRemoveCircle } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addItem,
  CartItem as CartItemInterface,
  removeItem,
  selectCart,
} from './cart.slice';

export const CartItem = ({
  id,
  quantity,
  price,
  product,
}: CartItemInterface) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  return (
    <Box
      position="relative"
      padding="0 0 15px"
      marginBottom="15px"
      borderBottom="1px solid #eee"
      fontWeight="thin"
      textTransform="uppercase"
      letterSpacing="1px"
    >
      <Box
        as="button"
        _hover={{ transform: 'scale(1.2)' }}
        transition="all 0.3s ease"
        borderRadius="4px"
        position="absolute"
        padding="10px"
        margin="10px"
        right="0"
        bottom="0"
        onClick={() => {
          dispatch(removeItem({ cart, product, quantity }));
        }}
      >
        <MdRemoveCircleOutline fontSize="24px" color="red" />
      </Box>
      <Box>
        <Box display="flex">
          <Image
            src={product.image}
            alt={product.name}
            maxWidth="100px"
            maxHeight="100px"
            width="100%"
            objectPosition="top"
            objectFit="cover"
          />
          <Box padding="0 0 0 20px" w="100%">
            <Box>
              <Text fontSize="lg">{product.name}</Text>
              <Text
                fontSize="md"
                textTransform="initial"
                letterSpacing="0"
                color="#aaa"
              >
                Description okoakijs siujsijs dij
              </Text>
            </Box>
            <Box
              marginTop="9px"
              display="flex"
              alignItems="center"
              justifyContent="right"
            >
              <Box display="flex" alignItems="center">
                <Button
                  onClick={() =>
                    dispatch(removeItem({ cart, product, quantity: 1 }))
                  }
                >
                  -
                </Button>
                <Text
                  h="40px"
                  w="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {quantity}
                </Text>
                <Button onClick={() => dispatch(addItem({ cart, product }))}>
                  +
                </Button>
              </Box>
            </Box>
          </Box>
          <Text fontSize="lg">${price.toFixed(2)}</Text>
        </Box>
      </Box>
    </Box>
  );
};
