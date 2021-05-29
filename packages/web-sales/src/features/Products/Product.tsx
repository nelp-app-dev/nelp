import { Box, Image } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addItem, selectCart } from '../Cart/cart.slice';

export const Product = ({
  id,
  name,
  price,
  image,
  onOpen,
}: {
  id: string;
  name: string;
  price: number;
  image: string;
  onOpen: any;
}) => {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  return (
    <Box
      background="#fff"
      _hover={{
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      }}
      transition="all 0.3s ease"
      boxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
      fontSize="lg"
      fontWeight="thin"
      textTransform="uppercase"
      letterSpacing="1px"
      textAlign="center"
    >
      <Box padding="15px" paddingBottom="0" position="relative">
        <Image
          src={image}
          alt="Segun Adebayo"
          width="100%"
          height="100%"
          objectPosition="top"
          objectFit="cover"
        />
        <Box padding="15px" paddingBottom="0">
          {name}
        </Box>
        <Box>{price.toFixed(2)}$</Box>
      </Box>
      <Box textAlign="center" padding="15px" paddingTop="0">
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
          marginTop="15px"
          w="100%"
          onClick={() => {
            const product = { id, name, price, image };
            dispatch(addItem({ cart, product }));
            onOpen();
          }}
        >
          Ajouter au panier
        </Box>
      </Box>
    </Box>
  );
};
