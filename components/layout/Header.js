import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from '../cart/Cart';

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <StyledLogo>
        <Link href="/">hello</Link>
      </StyledLogo>
      <Nav />
    </div>
    <Cart />
  </StyledHeader>
);

const StyledLogo = styled.h1`
  background-color: var(--Background);
  font-size: 5rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    color: var(--Primary);
    font-family: 'Asar';
  }
`;

const StyledHeader = styled.header`
  margin-bottom: 2rem;
  .bar {
    border-bottom: 10px solid var(--Primary, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
  }
  .sub-bar {
    border-bottom: 1px solid var(--Primary, black);
    display: grid;
    grid-template-columns: auto 1fr;
    background-color: var(--Foreground);
    color: var(--onForeground);
  }
`;

export default Header;
