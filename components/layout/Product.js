import styled, { css } from 'styled-components';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import formatPrice from '../../lib/formatPrice';
import AddToCart from '../cart/AddToCart';
import useUser from '../auth/User';
import Loader from '../elements/Loader';
import { USER_TUTORIALS_QUERY } from '../../lib/api';
import { isAlreadyPurchased } from '../../lib/isAlreadyPurchased';
import ErrorMessage from '../elements/ErrorMessage';

const Product = ({ product }) => {
  const [isFocused, setIsFocused] = useState(false);
  const user = useUser();
  const { data: tutorialData, error, loading } = useQuery(USER_TUTORIALS_QUERY);
  // TODO go over all of these and create loader and messaging and error
  if (loading) return <Loader />;
  if (error) return <ErrorMessage>Error... {error}</ErrorMessage>;
  let matchCartCacheToItem;
  let productname;
  if (user && user.cart) {
    matchCartCacheToItem = (itemId) =>
      // if the array (cart) contains an object with a value that matches the itemId, return true, then pass ismatch to addtccart component and if true, add to cart is disabled for that item
      user.cart.some((item) => item.product.id === itemId);
    productname = product.name;
  }

  return (
    <StyledCard isFocused={isFocused}>
      <p>{product.id}</p>
      <Link href={`/tutorial/${product.slug}`}>
        <StyledCardLink
          onMouseOver={() => setIsFocused(true)}
          onMouseOut={() => setIsFocused(false)}
        >
          <img
            alt={product.name}
            // nested chaining to check if product exists or image exists
            src={product?.image?.image?.publicUrlTransformed}
          />
          <StyledCardTitle>{user ? productname : product.name}</StyledCardTitle>
        </StyledCardLink>
      </Link>

      {!isAlreadyPurchased(user, tutorialData, product.id) && (
        <StyledPriceTag>
          <p>{formatPrice(product.price)}</p>
        </StyledPriceTag>
      )}
      <AddToCart
        isMatch={user && matchCartCacheToItem(product.id)}
        id={product.id}
        purchased={isAlreadyPurchased(user, tutorialData, product.id)}
        slug={product.slug}
      />
    </StyledCard>
  );
};

const StyledCard = styled.article`
  padding: 4rem 2rem 0;
  position: relative;
  display: grid;
  grid-template-rows: 1.5fr 0.5fr;
  justify-items: center;
  align-items: baseline;
  border: 2px solid var(--Primary);
  background-color: var(--PrimaryLight);
  img {
    max-width: 40%;
  }
  button {
    align-self: start;
  }
  ${({ isFocused }) =>
    isFocused &&
    css`
      background-color: RGB(156, 173, 251);
    `};
`;

const StyledCardLink = styled.a`
  display: grid;
  justify-items: center;
  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
  }
  margin-bottom: 2rem;
`;

const StyledCardTitle = styled.h3`
  display: inline;
  line-height: 1em;
  font-size: 4.5rem;
  font-weight: lighter;
  text-align: center;
  color: white;
  margin-bottom: 0;
  ${StyledCardLink}:hover & {
    border-bottom: 2px solid var(--OnMidground);
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
