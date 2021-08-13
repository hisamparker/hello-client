/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { USER_PRODUCTS_QUERY } from '../../lib/api';
import ErrorMessage from './ErrorMessage';
import TutorialDetail from './TutorialDetail';

const MyTutorials = () => {
  const { data, error, loading } = useQuery(USER_PRODUCTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { orders } = data.authenticatedItem;
  const tutorials = orders.map((order) =>
    order.items.map((item) => ({
      id: item.product.id,
      slug: item.product.slug,
    }))
  );
  const mergedTutorials = [];
  tutorials.map((tutorial) => mergedTutorials.push(...tutorial));

  return (
    <>
      {mergedTutorials.map((tutorial, idx) => (
        <TutorialDetail
          slug={tutorial.slug}
          id={tutorial.id}
          key={tutorial.id + idx}
        />
      ))}
    </>
  );
};

export default MyTutorials;
