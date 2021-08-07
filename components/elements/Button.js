import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

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
      background-color: var(--Primary);
      color: var(--OnMidground);
    `};
  ${({ styleProp }) =>
    styleProp === 'secondary' &&
    css`
      background-color: transparent;
      color: var(--Primary);
      border: 2px solid var(--Primary);
    `};
  ${({ styleProp }) =>
    styleProp === 'naked' &&
    css`
      background-color: transparent;
      padding: 0;
      color: var(--OnForground);
    `};
  ~ button {
    margin-left: 1rem;
  }
`;

const Button = ({ children, onClick, type, styleProp }) => (
  <StyledButton styleProp={styleProp} type={type} onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  type: PropTypes.string,
  styleProp: PropTypes.string,
};
