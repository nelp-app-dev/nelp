import {
  Box,
  Drawer as DrawerComponent,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Cart } from '../Cart/Cart';
import { selectCart } from '../Cart/cart.slice';
import { Checkout } from '../Cart/Checkout';

export const Drawer = ({ isOpen, onClose }: { isOpen: any; onClose: any }) => {
  const cart = useAppSelector(selectCart);
  const [currentView, setCurrentView] = useState('cart');

  return (
    <DrawerComponent
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        onClose();
        setCurrentView('cart');
      }}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent fontFamily="'Titillium Web', sans-serif">
        <DrawerCloseButton w="80px" h="80px" top="0" right="0" />
        {currentView === 'cart' && (
          <Cart setCurrentView={setCurrentView} onClose={onClose} />
        )}
        {currentView === 'checkout' && (
          <Checkout setCurrentView={setCurrentView} onClose={onClose} />
        )}
      </DrawerContent>
    </DrawerComponent>
  );
};
