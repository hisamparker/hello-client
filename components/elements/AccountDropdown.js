/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import useUser from '../auth/User';

const AccountDropdown = ({ children }) => {
  const user = useUser();

  let userInitial;
  if (user && user.name) {
    userInitial = user.name[0].toUpperCase();
  }
  return (
    <>
      <Circle>
        <div className="initial">{userInitial}</div>
        <div className="menu">{children}</div>
      </Circle>
    </>
  );
};

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  background-color: var(--Primary);
  z-index: 1000;
  .initial {
    font-size: 3rem;
    color: var(--OnMidground);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover .menu {
    display: block;
  }
  .menu {
    width: 200px;
    position: absolute;
    top: 100%;
    right: 0;
    padding: 1rem;
    display: none;
    background-color: white;
    border: 1px solid var(--Primary);
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
        text-decoration: none;
      }
      &:hover::after,
      &:focus::after {
        text-decoration: none;
        border: none;
      }
    }
    @media (max-width: 615px) {
      left: 0;
      a,
      button {
        text-align: left;
      }
    }
  }
`;

export default AccountDropdown;
