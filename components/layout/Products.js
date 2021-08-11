import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  grid-template-columns: 1fr 1fr;
  grid-gap: 6rem;
`;

export default Products;

Products.propTypes = {
  page: PropTypes.number,
};
