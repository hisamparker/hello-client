import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_ORDERS_QUERY } from '../../lib/api';
import useUser from '../auth/User';
import OrderDetail from './OrderDetail';
import Loader from '../elements/Loader';

const OrdersWithMutation = ({ notPage, classProp }) => {
  const { data, error, loading } = useQuery(CURRENT_USER_ORDERS_QUERY);
  const user = useUser();
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <p>Hey, you need to be logged in to view your orders!</p>;
  let orderData;
  if (data.authenticatedItem) {
    const { orders } = data.authenticatedItem;
    orderData = orders;
  }
  if (orderData.length <= 0) return <p>You don't have any orders yet!</p>;
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

export default OrdersWithMutation;
