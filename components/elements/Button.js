/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 0.75em 1em;
  font-weight: 400;
  position: relative;
  text-transform: uppercase;
  border: none;
  border-radius: 50px;
  font-size: 1.5rem;
  transition: all ease-out 200ms;
  letter-spacing: 1.5px;
  background-color: ${({ variant }) =>
    variant === 'primary' ? 'var(--Primary)' : 'transparent'};
  &:disabled {
    background-color: var(--Disabled);
    pointer-events: none;
    cursor: none;
    color: var(--OnDisabled);
    border: solid 2px var(--DisabledBorder);
  }
  ${({ variant }) =>
    variant === 'primary' &&
    css`
      color: var(--OnMidground);
    `};
  ${({ variant }) =>
    variant === 'secondary' &&
    css`
      color: var(--Primary);
      border: 2px solid var(--Primary);
    `};
  ${({ variant }) =>
    variant === 'naked' &&
    css`
      padding: 0;
      color: var(--OnForground);
    `};
`;

const Button = ({ disabled, onClick, type = 'button', variant, children }) => (
  <StyledButton
    disabled={disabled}
    variant={variant}
    type={type}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

export default Button;
