import Link from 'next/link';
import styled from 'styled-components';
import useUser from '../auth/User';
import LogOut from '../auth/LogOut';
import { useCart } from '../../context/cartState';
import CartTally from '../cart/CartTally';

const Nav = () => {
  const cart = useCart();
  const user = useUser();

  return (
    <StyledNav>
      <Link href="/products">All Tutorials</Link>
      {user ? (
        <>
          <Link href="/my-tutorials">my tutorials</Link>
          <Link href="/account">account</Link>
          <LogOut />
          {user.cart?.length > 0 && (
            <button type="button" onClick={() => cart.openCart()}>
              view cart
              {user.cart && (
                <CartTally
                  count={user.cart.reduce(
                    (acc, cartItem) => acc + +cartItem.quantity,
                    0
                  )}
                />
              )}
            </button>
          )}
        </>
      ) : (
        <>
          <Link href="/log-in">Log In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </>
      )}
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  a,
  button {
    text-decoration: none;
    padding: 1rem 3rem 0;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: 2rem;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:hover,
    &:focus {
      border: 0;
      text-decoration: none;
    }
    &:hover::after,
    &:focus::after {
      text-decoration: none;
      content: '';
      border-bottom: 2px solid var(--Primary);
      position: absolute;
      width: 60%;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid var(--lightGray);
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default Nav;
