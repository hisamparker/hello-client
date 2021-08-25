/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components';

const Modal = styled.section`
  position: fixed;
  z-index: 1000;
  width: 100vw;
  transform: translate(-50%, -100%);
  text-align: center;
  padding: 3rem 1rem;
  transition-delay: 0.5s;
  transition: all 0.3s ease-in;
  left: 50%;
  top: 0;
  color: white;
  font-size: 2rem;
  letter-spacing: 0.05em;
  background-color: var(--Primary);
  color: var(--OnMidground);
  border-bottom: 4px solid var(--PrimaryLight);
  font-size: 2.25rem;
  ${({ isOpen }) =>
    isOpen &&
    css`
      top: 0px;
      transform: translate(-50%, 0);
      transition: all 0.45s ease-out;
    `}
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 1rem;
    background-color: white;
    margin-top: 4px;
  }
`;

const Snackbar = ({ isOpen, message }) => (
  <Modal isOpen={isOpen}>{message}</Modal>
);

export default Snackbar;
