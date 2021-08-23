import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from '../cart/Cart';

const Header = () => (
  <StyledHeader>
    <StyledLogo>
      <Link href="/">hello</Link>
    </StyledLogo>
    <Nav />
    <Cart />
  </StyledHeader>
);

const StyledHeader = styled.header`
  padding: 0 2rem;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: space-between;
  align-items: baseline;
  @media (max-width: 575px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    justify-items: start;
  }
`;
const StyledLogo = styled.h1`
  font-size: 5rem;
  margin-left: 2rem;
  position: relative;
  text-transform: uppercase;
  margin: 2rem 1rem 0;
`;

export default Header;
