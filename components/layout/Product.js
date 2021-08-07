import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatPrice from '../../lib/formatPrice';
import DeleteProduct from './DeleteProduct';
import AddToCart from '../cart/AddToCart';
// import ItemStyles from '../styles/ItemStyles';

const Product = ({ product }) => {
  const productname = product.name;
  return (
    <StyledCard>
      <img
        alt={product.name}
        // nested chaining to check if product exists or image exists
        src={product?.image?.image?.publicUrlTransformed}
      />
      <StyledTitle>
        <Link href={`/product/${product.id}`}>{productname}</Link>
      </StyledTitle>
      <StyledPriceTag>
        <p>{formatPrice(product.price)}</p>
      </StyledPriceTag>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update-product',
            query: {
              id: product.id,
            },
          }}
        >
          Edit
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>delete</DeleteProduct>
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
