import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from '../cart/Cart';

const Header = () => (
  <StyledHeader>
    {/* <div className="bar"> */}
    <StyledLogo>
      <Link href="/">hello</Link>
    </StyledLogo>
    <Nav />
    {/* </div> */}
    <Cart />
  </StyledHeader>
);

const StyledHeader = styled.header`
  padding: 0 2rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 750px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: baseline;
  }
`;
const StyledLogo = styled.h1`
  background-color: var(--Background);
  font-size: 5rem;
  margin-left: 2rem;
  position: relative;
  a {
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    color: var(--Primary);
    font-family: 'Asar';
  }
  @media (max-width: 750px) {
    margin: 2rem 1rem 0;
  }
`;

export default Header;
