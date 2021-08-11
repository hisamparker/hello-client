import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import OrderDetail from './OrderDetail';
import { USER_ORDERS_QUERY } from '../../lib/api';

const OrdersWithMutation = () => {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;
  return (
    <>
      <Head>
        <title>
          {allOrders.name} ({allOrders.length}) orders
        </title>
      </Head>
      <h2>My dOrders</h2>
      <StyledOrderGrid>
        {allOrders.map((order) => (
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
