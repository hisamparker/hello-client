import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import OrderDetail from './OrderDetail';
import { CURRENT_USER_ORDERS_QUERY } from '../../lib/api';
import useUser from '../auth/User';

const OrdersWithMutation = () => {
  const { data, error, loading } = useQuery(CURRENT_USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const user = useUser;
  if (!user) return <p>Hey, you need to be logged in to view your orders!</p>;
  let orderData;
  if (data.authenticatedItem) {
    const { orders } = data.authenticatedItem;
    orderData = orders;
  }
  if (orderData.length <= 0) return <p>You don't have any orders yet!</p>;
  return (
    <>
      <Head>
        <title>
          {orderData.name} ({orderData.length}) orders
        </title>
      </Head>
      <h2>My Orders</h2>
      <StyledOrderGrid>
        {orderData.map((order, idx) => (
          <OrderDetail id={order.id} key={order.id + idx} />
        ))}
      </StyledOrderGrid>
    </>
  );
};

const StyledOrderGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
`;

export default OrdersWithMutation;
