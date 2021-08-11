import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import calculateCartTotal from '../../lib/calculateCartTotal';
import formatPrice from '../../lib/formatPrice';
import useUser, { CURRENT_USER_QUERY } from '../auth/User';
import { DELETE_FROM_CART_MUTATION } from '../../lib/api';
import CartStyles from '../styles/CartStyles';
import { useCart } from '../../context/cartState';
import Button from '../elements/Button';
import { Checkout } from './Checkout';

const CartItem = ({ cartItem }) => {
  const { product } = cartItem;
  const [deleteCartItem, { loading }] = useMutation(DELETE_FROM_CART_MUTATION, {
    variables: {
      id: cartItem.id,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  if (!product) return null;
  return (
    <article>
      <li>{cartItem.id}</li>
      <li>{cartItem.quantity}</li>
      <li style={{ backgroundColor: 'blue', width: '200px', height: '200px' }}>
        <img
          src={product.image.image.publicUrlTransformed}
          alt={product.name}
        />
      </li>
      <li>{product.name}</li>
      <li>{product.description}</li>
      <li>{formatPrice(product.price)}</li>
      <Button
        styleProp="naked"
        disabled={loading}
        type="button"
        onClick={() => deleteCartItem()}
      >
        delete item
      </Button>
    </article>
  );
};

const Cart = () => {
  const user = useUser();
  const data = useCart();
  if (!user || !user.cart) return null;
  return (
    <CartStyles open={data.cartOpen}>
      <article>
        <Button
          styleProp="primary"
          type="button"
          onClick={() => data.closeCart()}
        >
          close cart
        </Button>
        <div>{formatPrice(calculateCartTotal(user.cart))}</div>
        <h2>{user.name}'s cart</h2>
        <Checkout />
        <ul>
          {user.cart.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem.id} />
          ))}
        </ul>
        <div>Total: {formatPrice(calculateCartTotal(user.cart))}</div>
      </article>
    </CartStyles>
  );
};

export default Cart;

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
