import { useMutation, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useUser, { CURRENT_USER_QUERY } from '../auth/User';
import { useCart } from '../../context/cartState';
import Button from '../elements/Button';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
    }
  }
`;

export default function AddToCart({ id }) {
  const user = useUser();
  const data = useCart();
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
      disabled={loading}
      type="button"
      onClick={user ? handleAddToCart : handleLoginUser}
    >
      Add{loading && 'ing'} To Cart
    </Button>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string,
};
