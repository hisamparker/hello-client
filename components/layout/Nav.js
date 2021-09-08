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
    <section>
      {user ? (
        <StyledNav>
          <AccountDropdown>
            <Link href="/my-tutorials">
              <StyledA role="listitem">my tutorials</StyledA>
            </Link>
            <Link href="/products">
              <StyledA role="listitem">tutorials</StyledA>
            </Link>
            <Link href="/account">
              <StyledA role="listitem">account</StyledA>
            </Link>
            <LogOut />
          </AccountDropdown>
          {user.cart?.length > 0 && (
            <StyledCartButton onClick={() => cart.openCart()}>
              cart
              {user.cart && (
                <CartTally
                  count={user.cart.reduce(
                    (acc, cartItem) => acc + +cartItem.quantity,
                    0
                  )}
                />
              )}
            </StyledCartButton>
          )}
        </StyledNav>
      ) : (
        <StyledNav>
          <Link href="/products">
            <TutorialsLink tutorialsLink>tutorials</TutorialsLink>
          </Link>
          <Link href="/log-in">
            <StyledLoggedOutA>log in</StyledLoggedOutA>
          </Link>
          <Link href="/sign-up">
            <StyledLoggedOutA>sign up</StyledLoggedOutA>
          </Link>
        </StyledNav>
      )}
    </section>
  );
};

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  font-size: 2rem;
  padding-right: 1rem;
`;

const StyledCartButton = styled.button`
  color: var(--Primary);
  display: flex;
  align-items: center;
  position: relative;
  text-transform: uppercase;
  font-size: 2rem;
  background: none;
  padding: 1rem;
  border: 2px solid var(--Primary);
  border-radius: 50px;
  margin: 0 2rem;
  &:hover,
  &:focus {
    background-color: var(--PrimaryLight);
  }
`;

const StyledA = styled.a`
  text-transform: uppercase;
`;

const StyledLoggedOutA = styled.a`
  color: var(--Primary);
  border-bottom: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
  text-transform: uppercase;
  font-size: 2rem;
  background: none;
  padding: 1rem 3rem 0;
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
  @media (max-width: 750px) {
    padding: 0 1rem;
    letter-spacing: 0.1rem;
    text-align: left;
    margin-left: 1rem;
  }
`;
const TutorialsLink = styled(StyledLoggedOutA)`
  @media (max-width: 400px) {
    display: none;
  }
`;

export default Nav;
