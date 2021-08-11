/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { USER_PRODUCTS_QUERY } from '../../lib/api';
import ErrorMessage from './ErrorMessage';

const MyTutorials = () => {
  const { data, error, loading } = useQuery(USER_PRODUCTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { orders } = data.authenticatedItem;
  console.log(orders);
  return (
    <>
      <p>order</p>
      {/* {tutorials.map((tutorial) => (
        <ProductDetail id={tutorial.id} key={tutorial.id} />
      ))} */}
    </>
  );
};

export default MyTutorials;
