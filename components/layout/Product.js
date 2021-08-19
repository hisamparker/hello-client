import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import formatPrice from '../../lib/formatPrice';
import AddToCart from '../cart/AddToCart';
import useUser from '../auth/User';
import Loader from '../elements/Loader';
import { USER_TUTORIALS_QUERY } from '../../lib/api';

const Product = ({ product }) => {
  const user = useUser();
  // for some reason i get an error that my query doesn't return a graphql document if I import it and if i'm not logged in :/
  // I think not emptying cache entirely has fixed this... So I'll try without for a bit
  // const USER_TUTORIALS_QUERY = gql`
  //   query {
  //     # when we set up our config we said auth referencers the User schema but gql gives the option to auth anything
  //     # the authenticatedItem query returns a union, that's why there's the ... before User
  //     # this is incase you want to determine what type the auth is on in case we have subtypes https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/
  //     authenticatedItem {
  //       ... on User {
  //         id
  //         tutorials {
  //           product {
  //             id
  //             slug
  //             name
  //             description
  //             image {
  //               id
  //               altText
  //               image {
  //                 publicUrlTransformed
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `;
  const { data: tutorialData, error, loading } = useQuery(USER_TUTORIALS_QUERY);
  // TODO go over all of these and create loader and messaging and error
  if (loading) return <Loader />;
  if (error) return <p>Error... {error}</p>;
  let matchCartCacheToItem;
  let productname;
  if (user && user.cart) {
    matchCartCacheToItem = (itemId) =>
      // if the array (cart) contains an object with a value that matches the itemId, return true, then pass ismatch to addtccart component and if true, add to cart is disabled for that item
      user.cart.some((item) => item.product.id === itemId);
    productname = product.name;
  }
  let alreadyPurchased;
  if (user && tutorialData.authenticatedItem) {
    alreadyPurchased = tutorialData.authenticatedItem.tutorials.some(
      (tutorial) => tutorial.product.id === product.id
    );
  }
  return (
    <StyledCard>
      <img
        alt={product.name}
        // nested chaining to check if product exists or image exists
        src={product?.image?.image?.publicUrlTransformed}
      />
      <StyledTitle>
        <Link href={`/product/${product.id}`}>
          <a>{user ? productname : product.name}</a>
        </Link>
      </StyledTitle>
      <StyledPriceTag>
        <p>{formatPrice(product.price)}</p>
      </StyledPriceTag>
      <div className="buttonList">
        <AddToCart
          isMatch={user && matchCartCacheToItem(product.id)}
          id={product.id}
          purchased={alreadyPurchased}
          slug={product.slug}
        />
      </div>
    </StyledCard>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

const StyledCard = styled.article`
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

const StyledTitle = styled.h3`
  text-align: center;
  a {
    display: inline;
    line-height: 1.3;
    height: 32px;
    font-size: 5rem;
    font-family: 'Asar';
    font-weight: lighter;
    text-align: center;
    color: white;
  }
`;

const StyledPriceTag = styled.div`
  background-color: var(--OnMidground);
  border: solid 2px var(--Primary);
  position: absolute;
  right: 66px;
  top: 0;
  transform: translate(50%, -30%);

  /* Center the content */
  align-items: center;
  display: flex;
  justify-content: center;
  p {
    padding: 0 1rem;
    line-height: 1;
    font-size: 2rem;
    color: var(--Primary);
  }
`;

export default Product;
