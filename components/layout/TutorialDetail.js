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
      <Link href={`/tutorial/${slug}`}>{Product.name}</Link>
      <p>{Product.description}</p>
    </StyledCard>
  );
};

const StyledCard = styled.article`
  max-width: 400px;
  max-height: 400px;
  padding: 4rem 2rem 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--Primary);
  background-color: var(--PrimaryLight);
  ::before {
    background: var(--Primary);
    content: '';
    /* Position */
    top: 0;
    left: 0;
    position: absolute;
    transform: translate(1rem, 1rem);

    /* Size */
    height: 100%;
    width: 100%;

    /* Display under the main content */
    z-index: -1;
  }
  img {
    max-width: 40%;
  }
`;

// const StyledTitle = styled.h3`
//   text-align: center;
//   a {
//     display: inline;
//     line-height: 1.3;
//     height: 32px;
//     font-size: 5rem;
//     font-family: 'Asar';
//     font-weight: lighter;
//     text-align: center;
//     color: white;
//   }
// `;

export default TutorialDetail;
