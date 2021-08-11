import styled from 'styled-components';
// https://stripe.com/docs/stripe-js/react import loadStripe, we give load stripe our stripe key
// you can test using cards found here: https://stripe.com/docs/testing to get error messaging
import { loadStripe } from '@stripe/stripe-js';
// stripe elements, we need the Elements provided to give us access to all stripe elements for our checkout
// react stripe elements: https://stripe.com/docs/stripe-js/react
// elements is a package from stripe, you can only use one stripe element per page
//  Stripe Elements is a set of prebuilt UI components, like inputs and buttons, for building your checkout flow.
// It’s available as a feature of Stripe.js. Stripe.js tokenizes the sensitive information within an Element without ever having it touch your server.
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { CURRENT_USER_QUERY } from '../auth/User';
import { CREATE_ORDER_MUTATION } from '../../lib/api';
import { useCart } from '../../context/cartState';

// pass our stripe key into loadStripe, then we'll pass it to the stripe Element provider
// we call loadStripe outside of component so that we don't call it on everyrender
// we still need to pass the variable token, but we don't have it yet, so we need to pass it when we call the mutation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  // rename error because we also have the error coming from stripe
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      nProgress.start();
      // https://stripe.com/docs/js/payment_methods/create_payment_method I may want to add in billing details, but there's no shipping so leave this
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        //   type equals card, use the stripe elements, useElements hook from stripe
        type: 'card',
        card: elements.getElement(CardElement),
      });
      console.log(paymentMethod);
      if (error) {
        setError(error);
        nProgress.done(); // stops progress bar
        return; // stops the checkout from happening if there's an error
        // TODO: error messaging
      }
      // Send the token from step 3 to our keystone server, via a custom mutation! we need to pass our token here, cuz that's when we have access to it
      const order = await checkout({
        variables: {
          token: paymentMethod.id,
        },
      });
      //   TODO success message
      console.log(`Finished order!`);
      console.log(order);
      // Push to order page
      router.push({
        pathname: `/order/[id]`,
        query: {
          id: order.data.checkout.id,
        },
      });
      closeCart();
      setLoading(false);
      // stop showing progress bar as moving
      nProgress.done();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <button disabled={loading} type="submit">
        Check Out Now
      </button>
    </CheckoutFormStyles>
  );
};

const Checkout = () => (
  // wrap our checkout form in the Elements provider to give it access to stripe elements
  // the give the stripe prop a value of what loadStripe returns when given our key
  <Elements stripe={stripePromise}>
    {/* we're using stripe elements in the form, but they need to be wrapped in the provider so we put it inside the checkout component */}
    <CheckoutForm />
  </Elements>
);

export { Checkout };

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;
