/* eslint-disable react/prop-types */
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { PRODUCT_BY_ID_QUERY } from '../../lib/api';
import Loader from '../elements/Loader';

const TutorialDetail = ({ id, slug }) => {
  const { data, error, loading } = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <Loader />;
  if (error) return <p>Error...</p>;
  const { Product } = data;
  return (
    <StyledCard>
      <img
        alt={Product.name}
        // nested chaining to check if Product exists or image exists
        src={Product?.image?.image?.publicUrlTransformed}
      />
      <Link href={`/tutorial/${slug}`}>
        <a>{Product.name}</a>
      </Link>
      <StyledTutorialText>{Product.description}</StyledTutorialText>
    </StyledCard>
  );
};

const StyledCard = styled.article`
  max-width: 400px;
  max-height: 400px;
  padding: 4rem 1rem 2rem;
  position: relative;
  display: grid;
  grid-template-rows: 1fr 1fr 3fr;
  justify-items: center;
  border: 2px solid var(--Primary);
  background-color: var(--PrimaryLight);
  img {
    max-width: 40%;
  }
  a {
    text-transform: uppercase;
    font-size: 1.75rem;
  }
`;

const StyledTutorialText = styled.p`
  line-height: 1.5em;
  margin: 0;
  margin-left: 1rem;
  font-size: 1.75rem;
  color: var(--OnMidground);
`;

export default TutorialDetail;
