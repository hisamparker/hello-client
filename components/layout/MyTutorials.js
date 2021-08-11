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
  const tutorialItems = orders.map((order) =>
    order.items.map((item) => item.product.id)
  );
  const tutorials = [...tutorialItems[0], ...tutorialItems[1]];
  console.log('!!!', tutorials);
  return (
    <>
      {tutorials.map((tutorial) => (
        <TutorialDetail id={tutorial} key={tutorial} />
      ))}
    </>
  );
};

export default MyTutorials;
