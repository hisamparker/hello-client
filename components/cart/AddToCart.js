/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useUser from '../auth/User';
import { useCart } from '../../context/cartState';
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from '../../lib/api';
import Button from '../elements/Button';
import { useSnackbar } from '../../context/snackbarState';

const AddToCart = ({ id, isMatch }) => {
  const snackbar = useSnackbar();
  const user = useUser();
  const data = useCart();
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();
  const handleLoginUser = () => {
    snackbar.setSnackbarMessage('You need to log in to add items to your cart');
    snackbar.setSnackbarType('info');
    snackbar.openSnackbar();
    snackbar.setCloseButton(true);
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
};
export default AddToCart;
