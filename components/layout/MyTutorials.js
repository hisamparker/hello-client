/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { USER_PRODUCTS_QUERY } from '../../lib/api';
import ErrorMessage from './ErrorMessage';
import TutorialDetail from './TutorialDetail';
import Loader from '../elements/Loader';

const MyTutorials = ({ classProp, children }) => {
  // TODO change error and loading
  const { data, error, loading } = useQuery(USER_PRODUCTS_QUERY);
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  const mergedTutorials = [];
  const getTutorials = () => {
    const { orders } = data.authenticatedItem;
    const tutorials = orders.map((order) =>
      order.items.map((item) => ({
        id: item.product.id,
        slug: item.product.slug,
      }))
    );
    tutorials.map((tutorial) => mergedTutorials.push(...tutorial));
  };
  if (data.authenticatedItem) {
    getTutorials();
  }
  return (
    <article className={classProp}>
      {children}
      {mergedTutorials.map((tutorial, idx) => (
        <TutorialDetail
          slug={tutorial.slug}
          id={tutorial.id}
          key={tutorial.id + idx}
        />
      ))}
    </article>
  );
};

export default MyTutorials;
