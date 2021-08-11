/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useUser from '../auth/User';
import { useCart } from '../../context/cartState';
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from '../../lib/api';
import Button from '../elements/Button';

export default function AddToCart({ id, isMatch }) {
  const user = useUser();
  const data = useCart();
  console.log(isMatch);
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();
  const handleLoginUser = () => {
    // TODO toast that says you must be logged in
    router.push('/log-in');
  };
  const handleAddToCart = () => {
    addToCart();
    data.openCart();
  };
  return (
    <Button
      styleProp="primary"
      disabled={loading || isMatch}
      type="button"
      onClick={user ? handleAddToCart : handleLoginUser}
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {isMatch ? 'Already in Cart' : loading ? 'Adding to Cart' : 'Add to Cart'}
    </Button>
  );
}
