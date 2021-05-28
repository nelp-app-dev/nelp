import {
  Box,
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Heading,
} from '@chakra-ui/react';
import { useAppSelector } from '../../app/hooks';
import { selectCart } from './cart.slice';

import { CartItem } from './CartItem';

export const Cart = ({ setCurrentView, onClose }: any) => {
  const cart = useAppSelector(selectCart);
  return (
    <>
      <DrawerHeader bgColor="#eee">
        <Heading
          fontFamily="'Titillium Web', sans-serif"
          fontWeight="thin"
          textTransform="uppercase"
          letterSpacing="1px"
          padding="10px 0"
          fontSize="2xl"
        >
          Résumé du panier
        </Heading>
      </DrawerHeader>

      <DrawerBody padding="14px 24px">
        {cart.items.length === 0 ? (
          <Box
            fontSize="3xl"
            fontWeight="thin"
            display="flex"
            alignItems="center"
            textAlign="center"
            h="100%"
            justifyContent="center"
          >
            Votre panier est vide
          </Box>
        ) : (
          cart.items
            .slice(0)
            .reverse()
            .map((item) => <CartItem key={item.id} {...item} />)
        )}
      </DrawerBody>
      <DrawerFooter borderTopWidth="1px">
        {cart.items.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            w="100%"
          >
            <Button onClick={onClose}>Retour au magasin</Button>
          </Box>
        ) : (
          <Box
            as="button"
            transition="all 0.2s ease"
            _hover={{ bg: '#2196f3', color: '#fff' }}
            _active={{
              bg: '#2196f3',
              color: '#fff',
            }}
            border="1px"
            borderColor="#2196f3"
            color="#2196f3"
            padding="10px"
            fontWeight="thin"
            textTransform="uppercase"
            letterSpacing="1px"
            borderRadius="30px"
            w="100%"
            lineHeight="24px"
            onClick={() => setCurrentView('checkout')}
          >
            Passer la commande
          </Box>
        )}
      </DrawerFooter>
    </>
  );
};
