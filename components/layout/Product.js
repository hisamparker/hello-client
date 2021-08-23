import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import formatPrice from '../../lib/formatPrice';
import AddToCart from '../cart/AddToCart';
import useUser from '../auth/User';
import Loader from '../elements/Loader';
import { USER_TUTORIALS_QUERY } from '../../lib/api';

const Product = ({ product }) => {
  const user = useUser();
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
      <StyledCardTitle>{user ? productname : product.name}</StyledCardTitle>

      <StyledPriceTag>
        <p>{formatPrice(product.price)}</p>
      </StyledPriceTag>
      <AddToCart
        isMatch={user && matchCartCacheToItem(product.id)}
        id={product.id}
        purchased={alreadyPurchased}
        slug={product.slug}
      />
    </StyledCard>
  );
};

const StyledCard = styled.article`
  text-align: center;
  padding: 4rem 2rem 3rem;
  position: relative;
  display: grid;
  grid-template-rows: 1fr 0.75fr 0.25fr;
  justify-items: center;
  border: 2px solid var(--Primary);
  background-color: var(--PrimaryLight);
  img {
    max-width: 40%;
  }
  button {
    align-self: start;
  }
`;

const StyledCardTitle = styled.h3`
  display: inline;
  line-height: 1em;
  font-size: 4.5rem;
  font-weight: lighter;
  text-align: center;
  color: white;
  margin-bottom: 0;
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
