// import head to customize anything that would be in the header
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { PRODUCT_BY_ID_QUERY } from '../../lib/api';

const ProductDetail = ({ id }) => {
  console.log('####', id);
  // hook that sends the query! return data, errors, and if loading, it's reactive so it rerenders on change!
  // we need to pass in the id as a variable... becuase it's a variable
  const { data, error, loading } = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: {
      id,
    },
  });
  console.log({ error }, { loading }, { data });
  // if you navigate here via products, you'll get a loading === true because we need to fetch the data, but if you
  // refresh the page, you'll fetch from the data cache so the render happens on the client side and there's no load time (thanks apollo)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  // this needs to go after loading, otherwise js will try to destructure before data exists!
  const { Product } = data;
  console.log('prod', Product);
  return (
    <article>
      <Head>
        {/* now the tab will say exactly what's in the title instead of just something random */}
        <title>Hello Tutorials | {Product.name}</title>
      </Head>
      <div style={{ backgroundColor: 'blue' }}>
        <img
          alt={Product.name}
          // nested chaining to check if product exists or image exists
          src={Product?.image?.image?.publicUrlTransformed}
        />
      </div>
      <div>{Product.name}</div>
      <div>{Product.price}</div>
      <div>{Product.description}</div>
    </article>
  );
};

ProductDetail.propTypes = {
  id: PropTypes.string,
};

export default ProductDetail;
