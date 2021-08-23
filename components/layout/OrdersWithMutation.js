import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from '../elements/ErrorMessage';
import { CURRENT_USER_ORDERS_QUERY } from '../../lib/api';
import useUser from '../auth/User';
import OrderDetail from './OrderDetail';
import Loader from '../elements/Loader';
import InfoModal from '../elements/InfoModal';

const OrdersWithMutation = ({ notPage, classProp }) => {
  const { data, error, loading } = useQuery(CURRENT_USER_ORDERS_QUERY);
  const user = useUser();
  if (loading) return <Loader />;
  if (error)
    return (
      <StyledModalContainer>
        <ErrorMessage error={error} />;
      </StyledModalContainer>
    );
  if (!user)
    return (
      <StyledModalContainer>
        <InfoModal message="Hey, you need to be logged in to view your orders!" />
      </StyledModalContainer>
    );
  let orderData;
  if (data.authenticatedItem) {
    const { orders } = data.authenticatedItem;
    orderData = orders;
  }
  if (orderData.length <= 0)
    return (
      <StyledModalContainer>
        <InfoModal message="You don't have any orders yet!" />
      </StyledModalContainer>
    );
  return (
    <StyledOrdersArticle className={classProp}>
      {!notPage && (
        <Head>
          <title>
            {orderData.name} ({orderData.length}) orders
          </title>
        </Head>
      )}
      <h2>My Orders</h2>
      <StyledOrderGrid>
        {orderData.map((order, idx) => (
          <OrderDetail id={order.id} key={order.id + idx} />
        ))}
      </StyledOrderGrid>
    </StyledOrdersArticle>
  );
};
const StyledOrdersArticle = styled.article`
  display: grid;
  justify-items: center;
`;
const StyledOrderGrid = styled.section`
  justify-content: center;
  width: 100%;
  color: var(--PrimaryDark);
  display: grid;
  grid-template-columns: repeat(auto-fill, 325px);
  grid-gap: 4rem;
`;

export const StyledModalContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  margin: 4rem 2rem;
`;

export default OrdersWithMutation;
