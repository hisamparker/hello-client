/* eslint-disable react/prop-types */
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { PRODUCT_BY_ID_QUERY } from '../../lib/api';
import Loader from '../elements/Loader';

const TutorialDetail = ({ id, slug }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { data, error, loading } = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <Loader />;
  if (error) return <p>Error...</p>;
  const { Product } = data;
  return (
    <StyledCard isFocused={isFocused}>
      <Link href={`/tutorial/${slug}`}>
        <StyledCardLink
          onMouseOver={() => setIsFocused(true)}
          onMouseOut={() => setIsFocused(false)}
        >
          <img
            alt={Product.name}
            // nested chaining to check if Product exists or image exists
            src={Product?.image?.image?.publicUrlTransformed}
          />
          {Product.name}
        </StyledCardLink>
      </Link>
      <StyledTutorialText>{Product.description}</StyledTutorialText>
    </StyledCard>
  );
};

const StyledCard = styled.article`
  max-width: 400px;
  max-height: 400px;
  padding: 4rem 1rem;
  position: relative;
  display: grid;
  grid-template-rows: 0.6fr 0.4fr;
  justify-items: center;
  border: 2px solid var(--Primary);
  background-color: var(--PrimaryLight);
  img {
    max-width: 40%;
  }
  ${({ isFocused }) =>
    isFocused &&
    css`
      background-color: RGB(156, 173, 251);
    `};
`;

const StyledCardLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const StyledTutorialText = styled.p`
  line-height: 1.5em;
  margin: 0;
  margin-left: 1rem;
  font-size: 1.75rem;
  color: var(--OnMidground);
`;

export default TutorialDetail;
