/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components';

const Modal = styled.section`
  position: fixed;
  width: 100vw;
  transform: translate(-50%, -100%);
  text-align: center;
  padding: 2rem 1rem;
  transition-delay: 0.5s;
  transition: all 0.3s ease-out;
  left: 50%;
  top: 0;
  color: white;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  ${({ styleProp }) =>
    styleProp === 'success' &&
    css`
      background-color: var(--Primary)};
      color: var(--OnMidground)};
      border-bottom: 2px solid var(--PrimaryLight);
      top: 0px;
      transform: translate(-50%, 0);
      transition: all 0.45s ease-in;
    `}
  ${({ styleProp }) =>
    styleProp === 'error' &&
    css`
      background-color: var(--ErrorLight);
      border-bottom: 2px solid var(--Error);
      color: var(--OnErrorLight)};
      top: 0px;
      transform: translate(-50%, 0);
      transition: all 0.45s ease-in;
    `}
  ${({ styleProp }) =>
    styleProp === 'hidden' &&
    css`
      transform: translate(-50%, -100%);
      top: 0;
    `};
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 25px;
  width: 25px;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 0;
  &::after,
  &::before {
    content: '';
    height: 100%;
    width: 2px;
    background-color: white;
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
  }
  &::after {
    transform: rotate(45deg);
  }
  &::before {
    transform: rotate(-45deg);
  }
`;

const Toast = ({ styleProp, dismissOnClick, children }) => (
  <Modal styleProp={styleProp}>
    {dismissOnClick && (
      <CloseBtn name="button" onClick={dismissOnClick}>
        close
      </CloseBtn>
    )}
    {children}
  </Modal>
);

export default Toast;
