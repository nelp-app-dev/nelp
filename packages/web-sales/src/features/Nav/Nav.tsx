import { Box, Text } from '@chakra-ui/react';
import { RiShoppingCartFill } from 'react-icons/ri';
import { useAppSelector } from '../../app/hooks';
import { selectCart } from '../Cart/cart.slice';

export const Nav = ({ onOpen }: { onOpen: any }) => {
  const cart = useAppSelector(selectCart);

  return (
    <Box
      borderBottom="1px solid #ddd"
      height="80px"
      position="fixed"
      bgColor="#fff"
      zIndex="2"
      top="0"
      left="0"
      w="100%"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Box
        as="button"
        onClick={onOpen}
        padding="0 25px"
        height="79px"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <RiShoppingCartFill fontSize="26px" color="#2196f3" />
        {cart.total !== 0 && (
          <Text
            borderRadius="100%"
            color="#2196f3"
            marginLeft="5px"
            letterSpacing="1px"
            fontWeight="semibold"
          >
            ${cart.total.toFixed(2)}
          </Text>
        )}
      </Box>
    </Box>
  );
};
