import styled from 'styled-components';
import React from 'react';

const InfoModal = ({ message }) => <InfoContainer>{message}</InfoContainer>;

const InfoContainer = styled.article`
  color: white;
  justify-self: center;
  max-width: 700px;
  background-color: var(--PrimaryLight);
  padding: 2rem 4rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 5px solid var(--Primary);
  p {
    margin: 0;
  }
`;

export default InfoModal;
