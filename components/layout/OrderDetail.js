/* eslint-disable react/prop-types */
// import head to customize anything that would be in the header
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import formatPrice from '../../lib/formatPrice';
import { ORDER_BY_ID_QUERY } from '../../lib/api';

// because we named the page [id] it means anything the matches product/salfdjlasjflajdf will use this page ()
// we'll get the id for the product via props

const OrderDetail = ({ id }) => {
  // hook that sends the query! return data, errors, and if loading, it's reactive so it rerenders on change!
  // we need to pass in the id as a variable... becuase it's a variable
  const { data, error, loading } = useQuery(ORDER_BY_ID_QUERY, {
    variables: {
      id,
    },
  });
  // if you navigate here via products, you'll get a loading === true because we need to fetch the data, but if you
  // refresh the page, you'll fetch from the data cache so the render happens on the client side and there's no load time (thanks apollo)
  // TODO error and loading
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  // this needs to go after loading, otherwise js will try to destructure before data exists!
  const { Order } = data;
  return (
    <>
      <Head>
        {/* now the tab will say exactly what's in the title instead of just something random */}
        <title>Hello Tutorials | {Order.user.name}'s Order</title>
      </Head>
      <StyledOrderCard>
        <div>
          <h2>ORDER</h2>
          <p>
            <b>Order ID:</b> {Order.id}
          </p>
          <p>
            <b>Total Price:</b> {formatPrice(Order.total)}
          </p>
          <p>
            <b>Total Items: </b>
            {Order.items.length}
          </p>
        </div>
        {data.Order.items.map((product) => (
          <StyledOrderItem key={product.id}>
            <StyledCard product={product}>
              <img
                alt={product.name}
                // nested chaining to check if product exists or image exists
                // TODO make helper function for images
                src={product?.image?.image?.publicUrlTransformed}
              />
            </StyledCard>
            <div>
              <p>{product.name}</p>
              <p>{formatPrice(product.price)}</p>
            </div>
          </StyledOrderItem>
        ))}
      </StyledOrderCard>
    </>
  );
};
const StyledOrderCard = styled.article`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  border: 1px solid var(--Primary);
  padding: 1rem;
  padding-bottom: 1.5rem;
  h2 {
    margin: 0;
  }
  p {
    margin: 0;
  }
  div {
    margin-left: 2rem;
  }
`;
const StyledCard = styled.article`
  font-size: 1rem;
  max-width: 75px;
  max-height: 75px;
  color: white;
  padding: 1rem;
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
    transform: translate(0.5rem, 0.5rem);

    /* Size */
    height: 100%;
    width: 100%;

    /* Display under the main content */
    z-index: -1;
  }
  img {
    max-width: 90%;
  }
`;

const StyledOrderItem = styled.article`
  border: 1px solid var(--PrimaryLight);
  padding: 0.75rem 0 1.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 2rem;
  article {
    width: 30%;
  }
  div {
    width: 60%;
  }
`;

export default OrderDetail;
