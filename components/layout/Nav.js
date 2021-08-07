import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useUser from '../auth/User';
import LogOut from '../auth/LogOut';
import { useCart } from '../../context/cartState';
import CartTally from '../cart/CartTally';

const Nav = () => {
  const [isUser, setIsUser] = useState(false);
  const data = useCart();
  const user = useUser();

  useEffect(() => {
    if (user) {
      setIsUser(true);
    }
  }, [user]);
  return (
    <StyledNav>
      <Link href="/products">products</Link>
      {isUser && (
        <>
          <Link href="/add-product">add-product</Link>
          <Link href="/orders">orders</Link>
          <Link href="/account">account</Link>
          <LogOut setIsUser={setIsUser} />
          <button type="button" onClick={() => data.openCart()}>
            open cart
            <CartTally
              count={user.cart.reduce(
                (acc, cartItem) => acc + +cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!isUser && (
        <>
          <Link href="/log-in">Log In</Link>
          <Link props={setIsUser} href="/sign-up">
            Sign Up
          </Link>
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
