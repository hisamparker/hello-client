import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { USER_PRODUCTS_QUERY } from '../../lib/api';
import ErrorMessage from '../elements/ErrorMessage';
import TutorialDetail from './TutorialDetail';
import Loader from '../elements/Loader';
import InfoModal from '../elements/InfoModal';
import { StyledModalContainer } from './OrdersWithMutation';

const MyTutorials = ({ classProp, children }) => {
  // TODO change error
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
  if (mergedTutorials.length <= 0) {
    return (
      <StyledModalContainer>
        <InfoModal message="You don't have any tutorials yet :/" />
      </StyledModalContainer>
    );
  }
  return (
    <StyledArticle className={classProp}>
      {children}
      <StyledTutorialsArticle>
        {mergedTutorials.map((tutorial, idx) => (
          <TutorialDetail
            slug={tutorial.slug}
            id={tutorial.id}
            key={tutorial.id + idx}
          />
        ))}
      </StyledTutorialsArticle>
    </StyledArticle>
  );
};

const StyledArticle = styled.article`
  margin: 0 auto;
  width: 100%;
`;
const StyledTutorialsArticle = styled.article`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 325px);
  grid-gap: 3rem;
  article {
    margin-bottom: 4rem;
  }
`;

export default MyTutorials;
