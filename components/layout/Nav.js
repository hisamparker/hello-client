import Link from 'next/link';
import styled from 'styled-components';
import useUser from '../auth/User';
import LogOut from '../auth/LogOut';
import { useCart } from '../../context/cartState';
import CartTally from '../cart/CartTally';
import AccountDropdown from '../elements/AccountDropdown';

const Nav = () => {
  const cart = useCart();
  const user = useUser();

  return (
    <StyledNav>
      {user ? (
        <section>
          <AccountDropdown>
            <Link href="/my-tutorials">my tutorials</Link>
            <Link href="/products">tutorials</Link>
            <Link href="/account">account</Link>
            <LogOut />
          </AccountDropdown>
          {user.cart?.length > 0 && (
            <button id="cart" type="button" onClick={() => cart.openCart()}>
              cart
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
        </section>
      ) : (
        <section>
          <Link href="/products">
            <a id="tutorialsLink" className="loggedOut">
              tutorials
            </a>
          </Link>
          <Link href="/log-in">
            <a className="loggedOut">log in</a>
          </Link>
          <Link href="/sign-up">
            <a className="loggedOut">sign up</a>
          </Link>
        </section>
      )}
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  margin: 0;
  padding: 0;
  section {
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
  }
  .loggedOut {
    @media (max-width: 750px) {
      justify-content: flex-start;
      margin-left: 1rem;
    }
  }
  a,
  button {
    color: var(--Primary);
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
    @media (max-width: 750px) {
      padding: 0 1rem;
      letter-spacing: 0.1rem;
    }
  }
  a.loggedOut,
  b.loggedOut {
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
  #tutorialsLink {
    @media (max-width: 390px) {
      display: none;
    }
  }
  #cart {
    border: 2px solid var(--Primary);
    border-radius: 50px;
    margin-left: 2rem;
    &:hover,
    &:focus {
      background-color: var(--PrimaryLight);
    }
  }
`;

export default Nav;
