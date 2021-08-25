// import head to customize anything that would be in the header
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { PRODUCT_BY_ID_QUERY } from '../../lib/api';
import Loader from '../elements/Loader';
import { capitalizeFirstLetter } from '../../lib/capitalizeFirstLetter';

const ProductDetail = ({ id }) => {
  // hook that sends the query! return data, errors, and if loading, it's reactive so it rerenders on change!
  // we need to pass in the id as a variable... becuase it's a variable
  const { data, error, loading } = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: {
      id,
    },
  });
  // if you navigate here via products, you'll get a loading === true because we need to fetch the data, but if you
  // refresh the page, you'll fetch from the data cache so the render happens on the client side and there's no load time (thanks apollo)
  // TODO lodaing and error
  if (loading) return <Loader />;
  if (error) return <p>Error...</p>;
  // this needs to go after loading, otherwise js will try to destructure before data exists!
  const { Product } = data;
  return (
    <article>
      <Head>
        {/* now the tab will say exactly what's in the title instead of just something random */}
        <title>Hello Tutorials | {capitalizeFirstLetter(Product)}</title>
      </Head>
      <StyledCard>
        <img
          alt={Product.name}
          // nested chaining to check if product exists or image exists
          src={Product?.image?.image?.publicUrlTransformed}
        />
        <h3>{Product.name}</h3>
        <p>{Product.description}</p>
      </StyledCard>
    </article>
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
  h3 {
    margin-bottom: 0;
  }
`;

export default ProductDetail;
