import React, { Fragment } from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Product from './Product';
import { perPage } from '../../config';

export const ALL_PRODUCTS_QUERY = gql`
  # first accepts the var we pass called first, in gqp first is like slice, we pass an int to slice and that says return this number of objects from the query
  # in the graphql documentation there are other suggestions, but here's what we're using https://www.howtographql.com/graphql-js/8-filtering-pagination-and-sorting/
  #  TODO ask michael about skip another way? https://www.antstack.io/blog/graphql-pagination-with-apollo-v3-part-1/
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      price
      name
      description
      image {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

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
