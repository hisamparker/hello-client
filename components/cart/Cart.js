import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import calculateCartTotal from '../../lib/calculateCartTotal';
import formatPrice from '../../lib/formatPrice';
import useUser from '../auth/User';
import { DELETE_FROM_CART_MUTATION, CURRENT_USER_QUERY } from '../../lib/api';
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
    <StyledCartItem>
      <p>{formatPrice(product.price)}</p>
      <ul>
        <StyledImageLI>
          <img
            src={product.image.image.publicUrlTransformed}
            alt={product.name}
          />
        </StyledImageLI>
        <li>{product.name}</li>
      </ul>
      <Button
        styleProp="naked"
        disabled={loading}
        type="button"
        onClick={() => deleteCartItem()}
      >
        delete
      </Button>
    </StyledCartItem>
  );
};

const Cart = () => {
  const user = useUser();
  const data = useCart();
  if (!user || !user.cart) return null;
  return (
    <CartStyles open={data.cartOpen}>
      <section>
        <Button
          styleProp="primary"
          type="button"
          onClick={() => data.closeCart()}
        >
          close cart
        </Button>
        <ul>
          {user.cart.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem.id} />
          ))}
        </ul>
        <StyledCartFooter>
          <p>Total: {formatPrice(calculateCartTotal(user.cart))}</p>
          <Checkout />
        </StyledCartFooter>
      </section>
    </CartStyles>
  );
};

const StyledCartItem = styled.li`
  margin: 1rem 0;
  border: 1px solid var(--PrimaryLight);
  padding: 1rem;
  border-radius: 3rem;
  padding-left: 2rem;
  color: var(--PrimaryDark);
  p {
    margin: 0;
  }
`;

const StyledImageLI = styled.li`
  width: 100px;
  height: 100px;
  background-color: var(--PrimaryLight);
  border: solid 2px var(--Primary);
  padding: 1rem;
  img {
    width: 100%;
  }
`;

const CartStyles = styled.article`
  padding: 3rem;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  /* open the cart */
  ${(props) => props.open && `transform: translateX(0);`}
  header {
    border-bottom: 5px solid var(--black);
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  section {
    overflow: scroll;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const StyledCartFooter = styled.footer`
  border-top: 2px solid var(--PrimaryLight);
  margin-top: 2rem;
  padding-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  font-size: 3rem;
  p {
    margin: 0;
  }
`;

export default Cart;
