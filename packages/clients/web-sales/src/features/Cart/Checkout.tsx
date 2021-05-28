import {
  loadStripe,
  PaymentIntentResult,
  StripeCardElement,
} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Checkout.css';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react';

const promise = loadStripe(
  'pk_test_51IsqShFzcRQJnIkIg7fdrATq7L78sTPZWqIfHiDqSJqtSizTohjZD09N9ltioNa1O4LSHESygfpw7JAEA39u2aZC00uwpUVV1u',
);

export const Checkout = (props: any) => {
  return (
    <Elements stripe={promise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

const CheckoutForm = (props: any) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios
      .post('https://nelp.com:8000/v1/carts/pay', { items: [] })
      .then(({ data }) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const handleChange = async (event: any) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };
  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = (await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement) as StripeCardElement,
      },
    })) as PaymentIntentResult;
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError('');
      setProcessing(false);
      setSucceeded(true);
    }
  };

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
        <form id="payment-form" onSubmit={handleSubmit}>
          <CardElement id="card-element" onChange={handleChange} />
          {/* Show any error that happens when processing the payment */}
          {error && (
            <Box className="card-error" role="alert">
              {error}
            </Box>
          )}
          {/* Show a success message upon completion */}
          <Text
            className={succeeded ? 'result-message' : 'result-message hidden'}
          >
            Payment succeeded
          </Text>
        </form>
      </DrawerBody>
      <DrawerFooter borderTopWidth="1px">
        <Box
          as="button"
          disabled={processing || disabled || succeeded}
          transition="all 0.2s ease"
          _hover={{ bg: '#2196f3', color: '#fff' }}
          _active={{
            bg: '#2196f3',
            color: '#fff',
          }}
          _disabled={{
            opacity: '0.5',
            cursor: 'not-allowed',
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
          onClick={handleSubmit}
        >
          {processing ? (
            <Box className="spinner" id="spinner"></Box>
          ) : (
            'Pay now'
          )}
        </Box>
      </DrawerFooter>
    </>
  );
};
