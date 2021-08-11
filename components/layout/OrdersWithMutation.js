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
  if (!user) return <p>nope</p>;
  const { orders } = data.authenticatedItem;
  return (
    <>
      <Head>
        <title>
          {orders.name} ({orders.length}) orders
        </title>
      </Head>
      <h2>My Orders</h2>
      <StyledOrderGrid>
        {orders.map((order) => (
          <>
            <OrderDetail id={order.id} key={order.id} />
          </>
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
