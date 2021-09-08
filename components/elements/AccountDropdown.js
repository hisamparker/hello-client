import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import useUser from '../auth/User';

const AccountDropdown = ({ children }) => {
  const user = useUser();
  const [isTouched, setIsTouched] = useState(false);

  const handleTouch = () => {
    setIsTouched(!isTouched);
  };
  return (
    <>
      <Circle onClick={handleTouch}>
        <StyledInitial onTouchStart={handleTouch}>
          {user && user.name && user.name[0]}
        </StyledInitial>
        <StyledMenu onClick={handleTouch} isTouched={isTouched} role="list">
          {children}
        </StyledMenu>
      </Circle>
    </>
  );
};

const Circle = styled.article`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  background-color: var(--Primary);
  z-index: 4;
`;
const StyledInitial = styled.div`
  font-size: 3rem;
  color: var(--OnMidground);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
`;

const StyledMenu = styled.section`
  width: 200px;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 1rem;
  display: none;
  background-color: white;
  border: 1px solid var(--Primary);
  &:hover,
  ${Circle}:hover & {
    display: block;
  }
  &:focus,
  ${Circle}:focus & {
    display: block;
  }
  ${({ isTouched }) =>
    isTouched &&
    css`
      display: block;
    `};
  a,
  button {
    line-height: 1em;
    width: 100%;
    display: block;
    padding: 0.75rem 0.5rem;
    text-align: right;
    &:hover,
    &:focus {
      background-color: var(--Accent);
      outline: none;
    }
  }
  a {
    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
  @media (max-width: 575px) {
    left: 0;
    a,
    button {
      text-align: left;
    }
  }
`;

export default AccountDropdown;
