import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import useUser from '../auth/User';
import { useCart } from '../../context/cartState';
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from '../../lib/api';
import Button from '../elements/Button';
import { useSnackbar } from '../../context/snackbarState';

const AddToCart = ({ id, isMatch, purchased, slug }) => {
  const snackbar = useSnackbar();
  const user = useUser();
  const cart = useCart();
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();
  const handleLoginUser = () => {
    snackbar.snackbarFlow(`You need to log in to add items to your cart`);
    router.push('/log-in');
  };
  const handleAddToCart = () => {
    addToCart();
    cart.openCart();
  };

  const handleButtonMessage = () => {
    if (isMatch) {
      return 'Already in Cart';
    }
    if (loading) {
      return 'Adding to Cart';
    }
    return 'Add to Cart';
  };

  return (
    <>
      {purchased ? (
        <Link href={`/tutorial/${slug}`}>
          <StyledAddToCartLink>Go to tutorial!</StyledAddToCartLink>
        </Link>
      ) : (
        <Button
          variant="primary"
          disabled={loading || isMatch}
          onClick={user ? handleAddToCart : handleLoginUser}
        >
          {handleButtonMessage()}
        </Button>
      )}
    </>
  );
};

const StyledAddToCartLink = styled.a`
  color: var(--Primary);
  border-bottom: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
  text-transform: uppercase;
  font-size: 2rem;
  background: none;
  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
  }
  &:hover::after,
  &:focus::after {
    content: '';
    border-bottom: 2px solid var(--Primary);
    position: absolute;
    width: 60%;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
export default AddToCart;
