/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 0.75em 1em;
  font-weight: 400;
  position: relative;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  font-size: 1.5rem;
  transition: all ease-out 200ms;
  letter-spacing: 1.5px;
  background-color: ${({ styleProp }) =>
    styleProp === 'primary' ? 'var(--Primary)' : 'transparent'};
  &:disabled {
    background-color: var(--Disabled);
    pointer-events: none;
    cursor: none;
    color: var(--OnDisabled);
    border: solid 2px var(--DisabledBorder);
  }
  ${({ styleProp }) =>
    styleProp === 'primary' &&
    css`
      color: var(--OnMidground);
    `};
  ${({ styleProp }) =>
    styleProp === 'secondary' &&
    css`
      color: var(--Primary);
      border: 2px solid var(--Primary);
    `};
  ${({ styleProp }) =>
    styleProp === 'naked' &&
    css`
      padding: 0;
      color: var(--OnForground);
    `};
  ~ button {
    margin-left: 1rem;
  }
`;

const Button = ({ onClick, type, styleProp, children }) => (
  <StyledButton styleProp={styleProp} type={type} onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
