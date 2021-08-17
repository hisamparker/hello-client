/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';
import { perPage } from '../../config';
import { ALL_PRODUCTS_QUERY } from '../../lib/api';

const Products = ({ page }) => {
  // hook that sends the query! return data, errors, and if loading, it's reactive so it rerenders on change!
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    // pass variables into graphql query
    variables: {
      // skip = what page we're on time how many items we wish to show per page, minus the number of items we want per page
      // so on page 1, we get 1 * 4 - 4 (we skip 0 items), on page 2 we get 2 * 4 - 4 (we skip the 4 items that are on page 1 already)
      skip: page * perPage - perPage,
      // we fetch the first 4 (perPage = 4) objects
      first: perPage,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  return (
    <>
      <StyledProductGrid>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </StyledProductGrid>
    </>
  );
};

const StyledProductGrid = styled.section`
  display: grid;
  max-height: 100%;
  max-width: 95%;
  justify-items: stretch;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 5rem;
  margin-top: 3rem;
  @media (max-width: 810px) {
    grid-template-columns: 1fr;
  }
`;

export default Products;
