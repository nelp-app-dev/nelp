import { ChakraProvider, Box, theme, useDisclosure } from '@chakra-ui/react';
import { Nav } from './features/Nav/Nav';
import { Drawer } from './features/Drawer/Drawer';
import { Products } from './features/Products/Products';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { getCart } from './features/Cart/cart.slice';

export const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Nav onOpen={onOpen} />
      <Drawer isOpen={isOpen} onClose={onClose} />
      <Box padding="110px 30px 30px" fontFamily="'Titillium Web', sans-serif">
        <Products onOpen={onOpen} />
      </Box>
    </ChakraProvider>
  );
};
